// Exports contain text typed by site visitors and are opened in spreadsheets,
// which run a cell as a formula if it starts with =, +, -, @ or a full-width
// equivalent (OWASP "CSV Injection"). Quoting does not prevent that. A cell can
// also begin mid-value when the file is opened with another delimiter
// (semicolon, tab, pipe) or split on a line break, so those positions count as
// starts too. The lookahead keeps the match linear on long runs of whitespace.
const FORMULA_START =
  /(^|[;|\t\r\n])((?:(?![;|\t\r\n])[\s"\p{Cc}\p{Cf}])*)([=+\-@＝＋－＠])/gu;

// OWASP also treats a tab or line break at the start of a cell as unsafe.
const CONTROL_START = /^(?=[\t\r\n])|(?<=[;|])(?=[\t\r\n])|(?<=[\r\n])(?=\t)/g;

/** Make a string display as text by putting an apostrophe before any trigger. */
function asText(value: string): string {
  return value.replace(FORMULA_START, "$1$2'$3").replace(CONTROL_START, "'");
}

/** Serialise rows to CSV (RFC-4180-ish quoting, formula-safe). */
export function toCsv(
  rows: Record<string, unknown>[],
  columns: string[],
): string {
  const esc = (v: unknown) => {
    // Real numbers can't carry a formula, so negatives stay numeric.
    const s = v == null ? "" : typeof v === "number" ? String(v) : asText(String(v));
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = columns.map(esc).join(",");
  const body = rows
    .map((r) => columns.map((c) => esc(r[c])).join(","))
    .join("\n");
  return `${header}\n${body}\n`;
}
