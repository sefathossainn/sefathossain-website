"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/admin/access";
import { logActivity } from "@/lib/admin/activity";
import {
  can,
  sectionForTable,
  pageBlocksSeoOnly,
  isSeoBlockKey,
  settingsSeoOnly,
  type Action,
  type Role,
} from "@/lib/admin/permissions";
import { resolveTheme, type ThemeSettings } from "@/lib/theme";

const ALLOWED = new Set([
  "case_studies",
  "projects",
  "testimonials",
  "services",
  "faqs",
  "blog_posts",
  "content_blocks",
  "site_settings",
  "media",
  "categories",
  "leads",
  "audit_requests",
]);

const CONTENT_TABLES = new Set([
  "case_studies",
  "projects",
  "blog_posts",
  "testimonials",
  "services",
  "faqs",
]);

type Result = { ok: boolean; error?: string };
const DENIED: Result = {
  ok: false,
  error: "You don't have permission to do that.",
};

function bustCaches() {
  revalidatePath("/admin", "layout");
  revalidatePath("/", "layout");
}

async function currentRole(): Promise<Role | null> {
  const a = await checkAdminAccess();
  return a.ok && a.role ? a.role : null;
}

/** Insert (or update when `id` present; or upsert on `conflict`). */
export async function saveRecord(
  table: string,
  values: Record<string, unknown>,
  conflict?: string,
): Promise<Result> {
  if (!ALLOWED.has(table)) return { ok: false, error: "Table not allowed" };
  const role = await currentRole();
  const section = sectionForTable(table);
  if (!role || !section) return DENIED;
  const action: Action = values.id ? "edit" : "create";
  if (!can(role, section, action)) return DENIED;

  const sb = await createSupabaseServerClient();

  let error;
  if (values.id) {
    const { id, ...rest } = values;
    ({ error } = await sb.from(table).update(rest).eq("id", id));
  } else if (conflict) {
    ({ error } = await sb.from(table).upsert(values, { onConflict: conflict }));
  } else {
    ({ error } = await sb.from(table).insert(values));
  }
  if (error) return { ok: false, error: error.message };

  // Audit publish/unpublish on content saves.
  if (CONTENT_TABLES.has(table) && typeof values.status === "string") {
    await logActivity({
      action: values.status === "published" ? "content.publish" : "content.unpublish",
      target_table: table,
      target_id: (values.id as string) ?? null,
    });
  }
  bustCaches();
  return { ok: true };
}

/** Bulk upsert content_blocks for a page (SEO/H1 only for seo_expert). */
export async function saveContentBlocks(
  pageSlug: string,
  blocks: { block_key: string; value: unknown }[],
): Promise<Result> {
  const role = await currentRole();
  if (!role || !can(role, "pages", "edit")) return DENIED;

  const permitted = pageBlocksSeoOnly(role)
    ? blocks.filter((b) => isSeoBlockKey(b.block_key))
    : blocks;
  if (permitted.length === 0) return { ok: true };

  const sb = await createSupabaseServerClient();
  const rows = permitted.map((b) => ({
    page_slug: pageSlug,
    block_key: b.block_key,
    value: b.value,
  }));
  const { error } = await sb
    .from("content_blocks")
    .upsert(rows, { onConflict: "page_slug,block_key" });
  if (error) return { ok: false, error: error.message };
  bustCaches();
  return { ok: true };
}

/** Upsert the single site_settings row (SEO defaults only for seo_expert). */
export async function saveSettings(
  values: Record<string, unknown>,
): Promise<Result> {
  const role = await currentRole();
  if (!role || !can(role, "settings", "edit")) return DENIED;

  const payload = settingsSeoOnly(role)
    ? { seo_defaults: values.seo_defaults }
    : values;

  const sb = await createSupabaseServerClient();
  const { error } = await sb
    .from("site_settings")
    .upsert({ id: 1, ...payload }, { onConflict: "id" });
  if (error) return { ok: false, error: error.message };
  bustCaches();
  return { ok: true };
}

/** Save global theme (colors + type scale). Admin/super_admin only. */
export async function saveTheme(theme: ThemeSettings): Promise<Result> {
  const role = await currentRole();
  if (!role || !can(role, "appearance", "edit")) return DENIED;

  // resolveTheme sanitizes every value (hex-only colors, clamped percentages),
  // so nothing untrusted can reach the injected <style>.
  const clean = resolveTheme(theme);
  const sb = await createSupabaseServerClient();
  const { error } = await sb
    .from("site_settings")
    .upsert({ id: 1, theme: clean }, { onConflict: "id" });
  if (error) return { ok: false, error: error.message };
  await logActivity({ action: "theme.update", target_table: "site_settings" });
  bustCaches();
  return { ok: true };
}

export async function deleteRecord(
  table: string,
  id: string,
): Promise<Result> {
  if (!ALLOWED.has(table)) return { ok: false, error: "Table not allowed" };
  const role = await currentRole();
  const section = sectionForTable(table);
  if (!role || !section || !can(role, section, "delete")) return DENIED;

  const sb = await createSupabaseServerClient();
  const { error } = await sb.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity({ action: "content.delete", target_table: table, target_id: id });
  bustCaches();
  return { ok: true };
}

export async function setStatus(
  table: string,
  id: string,
  status: string,
): Promise<Result> {
  if (!ALLOWED.has(table)) return { ok: false, error: "Table not allowed" };
  const role = await currentRole();
  const section = sectionForTable(table);
  if (!role || !section) return DENIED;

  // Content status = publish/unpublish; leads/audit status = edit.
  const needed: Action = CONTENT_TABLES.has(table) ? "publish" : "edit";
  if (!can(role, section, needed)) return DENIED;

  const sb = await createSupabaseServerClient();
  const { error } = await sb.from(table).update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };

  await logActivity({
    action: CONTENT_TABLES.has(table)
      ? status === "published"
        ? "content.publish"
        : "content.unpublish"
      : "inbox.status",
    target_table: table,
    target_id: id,
    detail: status,
  });
  bustCaches();
  return { ok: true };
}
