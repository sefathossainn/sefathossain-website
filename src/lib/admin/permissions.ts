/**
 * Role-based access control for /admin. Single source of truth for what each
 * role may see and do. Checked in the UI (to hide nav/controls) AND server-side
 * in every route/action (the real gate — never trust the UI).
 *
 * Roles:
 *  - super_admin — everything, incl. managing other admins
 *  - admin       — all content + leads + settings, but NOT user management
 *  - seo_expert  — per-page SEO/H1 fields, Blog (full), Settings→SEO defaults
 *  - editor      — Blog (full), Case Studies (edit, no delete), Testimonials
 */

export const ROLES = ["super_admin", "admin", "seo_expert", "editor"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super admin",
  admin: "Admin",
  seo_expert: "SEO expert",
  editor: "Editor",
};

export type Section =
  | "dashboard"
  | "pages"
  | "case-studies"
  | "projects"
  | "blog"
  | "testimonials"
  | "services"
  | "faqs"
  | "media"
  | "leads"
  | "audit"
  | "settings"
  | "appearance"
  | "users";

export type Action = "view" | "create" | "edit" | "delete" | "publish";

type Matrix = Partial<Record<Section, Action[]>>;

const ALL_CONTENT: Matrix = {
  dashboard: ["view"],
  pages: ["view", "create", "edit", "delete"],
  "case-studies": ["view", "create", "edit", "delete", "publish"],
  projects: ["view", "create", "edit", "delete", "publish"],
  blog: ["view", "create", "edit", "delete", "publish"],
  testimonials: ["view", "create", "edit", "delete"],
  services: ["view", "create", "edit", "delete"],
  faqs: ["view", "create", "edit", "delete"],
  media: ["view", "create", "delete"],
  leads: ["view", "edit"],
  audit: ["view", "edit"],
  settings: ["view", "edit"],
  appearance: ["view", "edit"], // admin + super_admin only (not seo_expert)
};

const MATRIX: Record<Role, Matrix> = {
  super_admin: {
    ...ALL_CONTENT,
    users: ["view", "create", "edit", "delete"],
  },
  admin: {
    ...ALL_CONTENT,
  },
  seo_expert: {
    dashboard: ["view"],
    pages: ["view", "edit"], // SEO/H1 fields only (see isSeoBlockKey)
    blog: ["view", "create", "edit", "delete", "publish"],
    media: ["view", "create"],
    settings: ["view", "edit"], // SEO defaults only (see settingsSeoOnly)
  },
  editor: {
    dashboard: ["view"],
    blog: ["view", "create", "edit", "delete", "publish"],
    "case-studies": ["view", "create", "edit", "publish"], // no delete
    testimonials: ["view", "create", "edit", "delete"],
    media: ["view", "create"],
  },
};

export function can(role: Role, section: Section, action: Action): boolean {
  return MATRIX[role]?.[section]?.includes(action) ?? false;
}

export function canAccessSection(role: Role, section: Section): boolean {
  return (MATRIX[role]?.[section]?.length ?? 0) > 0;
}

export function visibleSections(role: Role): Section[] {
  return Object.keys(MATRIX[role] ?? {}) as Section[];
}

export function isSuperAdmin(role: Role | undefined | null): boolean {
  return role === "super_admin";
}

// ── Fine-grained scopes ─────────────────────────────────────────────────────

/** seo_expert may only touch SEO defaults within Site Settings. */
export function settingsSeoOnly(role: Role): boolean {
  return role === "seo_expert";
}

/** seo_expert may only edit SEO/meta/H1 content blocks on a page. */
export function pageBlocksSeoOnly(role: Role): boolean {
  return role === "seo_expert";
}

/** Which content_blocks keys count as "SEO / H1" (editable by seo_expert). */
export function isSeoBlockKey(key: string): boolean {
  return (
    key.startsWith("meta.") ||
    key === "hero.h1" ||
    key === "hero.headline" ||
    key.endsWith(".h1")
  );
}

// ── Table / collection → section maps (for server-side enforcement) ─────────

const TABLE_SECTION: Record<string, Section> = {
  content_blocks: "pages",
  case_studies: "case-studies",
  projects: "projects",
  blog_posts: "blog",
  categories: "blog",
  testimonials: "testimonials",
  services: "services",
  faqs: "faqs",
  media: "media",
  site_settings: "settings",
  leads: "leads",
  audit_requests: "audit",
};

export function sectionForTable(table: string): Section | null {
  return TABLE_SECTION[table] ?? null;
}

const COLLECTION_SECTION: Record<string, Section> = {
  "case-studies": "case-studies",
  projects: "projects",
  blog: "blog",
  testimonials: "testimonials",
  services: "services",
  faqs: "faqs",
};

export function sectionForCollection(slug: string): Section | null {
  return COLLECTION_SECTION[slug] ?? null;
}
