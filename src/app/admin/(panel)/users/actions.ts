"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkAdminAccess } from "@/lib/admin/access";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logActivity } from "@/lib/admin/activity";
import { ROLES, type Role } from "@/lib/admin/permissions";

type Result = { ok: boolean; error?: string; inviteLink?: string };

const MIN_PW = 10;
const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

/** The origin the admin is currently on (works on vercel.app now, domain later). */
async function currentOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://sefathossain.com"
  );
}

/** Every action here is super_admin-only — enforced server-side, always. */
async function requireSuper() {
  const a = await checkAdminAccess();
  if (!a.ok || a.role !== "super_admin") return null;
  return a;
}

/**
 * Create an admin. If `password` is provided the super admin sets it directly;
 * otherwise a one-time invite link is returned for the user to set their own.
 */
export async function createAdmin(input: {
  email: string;
  name: string;
  role: Role;
  password?: string;
}): Promise<Result> {
  const su = await requireSuper();
  if (!su) return { ok: false, error: "Only a super admin can add users." };

  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!emailOk(email)) return { ok: false, error: "Enter a valid email address." };
  if (!ROLES.includes(input.role)) return { ok: false, error: "Invalid role." };
  const password = input.password?.trim() || "";
  if (password && password.length < MIN_PW) {
    return { ok: false, error: `Password must be at least ${MIN_PW} characters.` };
  }

  const admin = createSupabaseAdminClient();
  let userId: string;
  let inviteLink: string | undefined;

  if (password) {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username: name, role: input.role },
    });
    if (error || !data.user) {
      return { ok: false, error: error?.message ?? "Could not create the user." };
    }
    userId = data.user.id;
  } else {
    const origin = await currentOrigin();
    const { data, error } = await admin.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        data: { username: name, role: input.role },
        redirectTo: `${origin}/set-password`,
      },
    });
    if (error || !data.user) {
      return {
        ok: false,
        error: error?.message ?? "Could not create the invite (email may already exist).",
      };
    }
    userId = data.user.id;
    inviteLink = data.properties?.action_link;
  }

  const { error: rowErr } = await admin.from("admin_users").insert({
    id: userId,
    email,
    username: name || null,
    role: input.role,
    created_by: su.userId,
    status: "active",
  });
  if (rowErr) return { ok: false, error: rowErr.message };

  await logActivity({
    action: password ? "user.create" : "user.invite",
    target_table: "admin_users",
    target_id: userId,
    detail: `${email} (${input.role})`,
  });
  revalidatePath("/admin/users");
  return { ok: true, inviteLink };
}

/** Update any admin — name, email, role, status, and/or a new password. */
export async function updateAdmin(
  id: string,
  patch: {
    name?: string;
    email?: string;
    role?: Role;
    status?: "active" | "disabled";
    password?: string;
  },
): Promise<Result> {
  const su = await requireSuper();
  if (!su) return { ok: false, error: "Only a super admin can edit users." };
  const isSelf = id === su.userId;

  const admin = createSupabaseAdminClient();
  const row: Record<string, unknown> = {};
  const auth: Record<string, unknown> = {};
  const meta: Record<string, unknown> = {};
  let changedPassword = false;

  if (patch.name !== undefined) {
    row.username = patch.name.trim() || null;
    meta.username = patch.name.trim() || null;
  }
  if (patch.email !== undefined) {
    const email = patch.email.trim().toLowerCase();
    if (!emailOk(email)) return { ok: false, error: "Enter a valid email address." };
    row.email = email;
    auth.email = email;
    auth.email_confirm = true;
  }
  if (patch.role !== undefined && !isSelf) {
    if (!ROLES.includes(patch.role)) return { ok: false, error: "Invalid role." };
    row.role = patch.role;
    meta.role = patch.role;
  }
  if (patch.status !== undefined && !isSelf) {
    if (patch.status !== "active" && patch.status !== "disabled") {
      return { ok: false, error: "Invalid status." };
    }
    row.status = patch.status;
    auth.ban_duration = patch.status === "disabled" ? "876000h" : "none";
  }
  if (patch.password) {
    if (patch.password.length < MIN_PW) {
      return { ok: false, error: `Password must be at least ${MIN_PW} characters.` };
    }
    auth.password = patch.password;
    changedPassword = true;
  }

  if (Object.keys(row).length) {
    const { error } = await admin.from("admin_users").update(row).eq("id", id);
    if (error) return { ok: false, error: error.message };
  }
  if (Object.keys(meta).length) auth.user_metadata = meta;
  if (Object.keys(auth).length) {
    const { error } = await admin.auth.admin.updateUserById(id, auth);
    if (error) return { ok: false, error: error.message };
  }

  await logActivity({
    action: changedPassword ? "user.password" : "user.update",
    target_table: "admin_users",
    target_id: id,
  });
  revalidatePath("/admin/users");
  return { ok: true };
}

/** Permanently delete an admin (auth user + row + attribution set to null). */
export async function deleteAdmin(id: string): Promise<Result> {
  const su = await requireSuper();
  if (!su) return { ok: false, error: "Only a super admin can delete users." };
  if (id === su.userId) {
    return { ok: false, error: "You can't delete your own account." };
  }

  const admin = createSupabaseAdminClient();
  await admin.from("admin_users").delete().eq("id", id);
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return { ok: false, error: error.message };

  await logActivity({
    action: "user.delete",
    target_table: "admin_users",
    target_id: id,
  });
  revalidatePath("/admin/users");
  return { ok: true };
}
