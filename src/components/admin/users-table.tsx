"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAdmin } from "@/app/admin/(panel)/users/actions";
import { ROLE_LABELS, type Role } from "@/lib/admin/permissions";
import { Table, Th, Td } from "@/components/admin/ui";
import { formatDate, cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/admin/users-data";

export function UsersTable({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [pending, start] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const onDelete = (u: AdminUser) => {
    if (
      !confirm(
        `Permanently delete ${u.email}? This removes their account and access. This can't be undone.`,
      )
    )
      return;
    start(async () => {
      setError(null);
      const res = await deleteAdmin(u.id);
      if (!res.ok) setError(res.error ?? "Failed to delete.");
      router.refresh();
    });
  };

  return (
    <>
      {error && (
        <p className="mb-4 text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}
      <Table>
        <thead>
          <tr>
            <Th>User</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Added</Th>
            <Th>{""}</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isSelf = u.id === currentUserId;
            const disabled = u.status === "disabled";
            return (
              <tr key={u.id}>
                <Td>
                  <div className="text-mist">{u.username ?? "—"}</div>
                  <div className="text-xs text-slate">{u.email}</div>
                </Td>
                <Td>{ROLE_LABELS[u.role as Role] ?? u.role}</Td>
                <Td>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-wide",
                      disabled
                        ? "border-[#e88c7d]/40 bg-[#e88c7d]/10 text-[#e88c7d]"
                        : "border-signal/40 bg-signal/10 text-signal",
                    )}
                  >
                    {u.status}
                  </span>
                </Td>
                <Td className="whitespace-nowrap">{formatDate(u.created_at)}</Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="text-emerald hover:underline"
                    >
                      Edit
                    </Link>
                    {!isSelf && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => onDelete(u)}
                        className="text-slate transition-colors hover:text-[#e88c7d] disabled:opacity-50"
                      >
                        Delete
                      </button>
                    )}
                    {isSelf && <span className="kicker text-slate">you</span>}
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
