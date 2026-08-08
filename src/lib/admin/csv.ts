/** Serialise rows to CSV (RFC-4180-ish quoting). */
export function toCsv(
  rows: Record<string, unknown>[],
  columns: string[],
): string {
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = columns.map(esc).join(",");
  const body = rows
    .map((r) => columns.map((c) => esc(r[c])).join(","))
    .join("\n");
  return `${header}\n${body}\n`;
}
