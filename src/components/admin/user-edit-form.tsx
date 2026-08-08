"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { updateAdmin, deleteAdmin } from "@/app/admin/(panel)/users/actions";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/admin/permissions";
import { Field, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/lib/admin/users-data";

export function UserEditForm({
  user,
  isSelf,
}: {
  user: AdminUser;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [name, setName] = React.useState(user.username ?? "");
  const [email, setEmail] = React.useState(user.email);
  const [role, setRole] = React.useState<Role>(user.role as Role);
  const [status, setStatus] = React.useState<"active" | "disabled">(
    user.status === "disabled" ? "disabled" : "active",
  );
  const [password, setPassword] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const res = await updateAdmin(user.id, {
      name,
      email,
      role,
      status,
      password: password || undefined,
    });
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Save failed.");
      return;
    }
    setSaved(true);
    setPassword("");
    router.refresh();
  }

  async function onDelete() {
    if (
      !confirm(
        `Permanently delete ${user.email}? This removes their account and access. This can't be undone.`,
      )
    )
      return;
    const res = await deleteAdmin(user.id);
    if (!res.ok) {
      setError(res.error ?? "Delete failed.");
      return;
    }
    router.push("/admin/users");
    router.refresh();
  }

  return (
    <form onSubmit={onSave} className="grid max-w-lg gap-5">
      <Field label="Name" htmlFor="name">
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Role" htmlFor="role">
        <Select
          id="role"
          value={role}
          disabled={isSelf}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </Select>
        {isSelf && (
          <p className="mt-1 text-xs text-slate">
            You can&rsquo;t change your own role.
          </p>
        )}
      </Field>
      <Field label="Status" htmlFor="status">
        <Select
          id="status"
          value={status}
          disabled={isSelf}
          onChange={(e) => setStatus(e.target.value as "active" | "disabled")}
        >
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </Select>
        {isSelf ? (
          <p className="mt-1 text-xs text-slate">
            You can&rsquo;t disable your own account.
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate">
            Disabling cuts off access immediately.
          </p>
        )}
      </Field>
      <Field label="New password" htmlFor="password" optional>
        <Input
          id="password"
          type="text"
          autoComplete="off"
          placeholder="Leave blank to keep the current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="mt-1 text-xs text-slate">Min 10 characters.</p>
      </Field>

      {error && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-line/70 pt-6">
        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          {saved && <span className="text-sm text-signal">Saved ✓</span>}
        </div>
        {!isSelf && (
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-slate transition-colors hover:text-[#e88c7d]"
          >
            Delete account
          </button>
        )}
      </div>
    </form>
  );
}
