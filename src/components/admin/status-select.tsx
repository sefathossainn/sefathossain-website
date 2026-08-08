"use client";

import * as React from "react";
import { setStatus } from "@/lib/admin/mutations";

export function StatusSelect({
  table,
  id,
  value,
  options,
}: {
  table: string;
  id: string;
  value: string;
  options: string[];
}) {
  const [v, setV] = React.useState(value);
  const [pending, start] = React.useTransition();

  return (
    <select
      value={v}
      disabled={pending}
      onChange={(e) => {
        const nv = e.target.value;
        setV(nv);
        start(async () => {
          await setStatus(table, id, nv);
        });
      }}
      className="rounded-lg border border-line bg-forest/60 px-2.5 py-1.5 text-sm text-mist focus:border-evergreen focus:outline-none disabled:opacity-50"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
