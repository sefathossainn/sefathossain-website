/** Schema-driven admin collections — powers the generic list + record form. */

export type FieldType =
  | "text"
  | "textarea"
  | "html"
  | "select"
  | "checkbox"
  | "number"
  | "tags"
  | "lines"
  | "image"
  | "metrics"
  | "seo";

export type FieldSpec = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  help?: string;
  full?: boolean;
};

/** Tells the SEO panel which fields to read for live title/slug/content analysis. */
export type SeoContextSpec = {
  titleField: string;
  slugField: string;
  bodyFields: string[];
  urlPrefix: string;
};

export type Collection = {
  table: string;
  label: string;
  singular: string;
  order: string;
  ascending: boolean;
  /** Columns shown in the list table (key + header). */
  list: { key: string; header: string }[];
  fields: FieldSpec[];
  /** blog needs category options loaded from the categories table. */
  categorySelect?: boolean;
  /** Present when the collection has a public page with an SEO panel. */
  seo?: SeoContextSpec;
};

const status: FieldSpec = {
  name: "status",
  label: "Status",
  type: "select",
  options: ["draft", "published"],
};
const sortOrder: FieldSpec = {
  name: "sort_order",
  label: "Sort order",
  type: "number",
};
const featured: FieldSpec = {
  name: "featured",
  label: "Featured",
  type: "checkbox",
};
const seoField: FieldSpec = {
  name: "seo",
  label: "SEO",
  type: "seo",
  full: true,
};

export const collections: Record<string, Collection> = {
  "case-studies": {
    table: "case_studies",
    label: "Case Studies",
    singular: "Case study",
    order: "sort_order",
    ascending: true,
    list: [
      { key: "title", header: "Title" },
      { key: "category", header: "Category" },
      { key: "status", header: "Status" },
      { key: "sort_order", header: "Order" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", full: true },
      { name: "slug", label: "Slug", type: "text", help: "URL: /work/slug" },
      { name: "tagline", label: "Tagline", type: "text", full: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["security", "build", "performance"],
      },
      status,
      featured,
      sortOrder,
      { name: "hero_image", label: "Hero image", type: "image", full: true },
      {
        name: "situation",
        label: "The situation (HTML)",
        type: "html",
        full: true,
      },
      {
        name: "approach",
        label: "How I approached it (HTML)",
        type: "html",
        full: true,
      },
      { name: "outcome", label: "The outcome (HTML)", type: "html", full: true },
      {
        name: "metrics",
        label: "Metrics (only where real)",
        type: "metrics",
        full: true,
        help: "Leave empty if there's no confirmed number — never fabricate.",
      },
      seoField,
    ],
    seo: {
      titleField: "title",
      slugField: "slug",
      bodyFields: ["situation", "approach", "outcome"],
      urlPrefix: "/work/",
    },
  },

  projects: {
    table: "projects",
    label: "Projects",
    singular: "Project",
    order: "sort_order",
    ascending: true,
    list: [
      { key: "title", header: "Title" },
      { key: "type", header: "Type" },
      { key: "status", header: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", full: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "type", label: "Type", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", full: true },
      { name: "live_url", label: "Live URL", type: "text", full: true },
      {
        name: "images",
        label: "Image URLs (one per line)",
        type: "lines",
        full: true,
      },
      { name: "stack", label: "Stack (comma separated)", type: "tags", full: true },
      featured,
      status,
      sortOrder,
    ],
  },

  blog: {
    table: "blog_posts",
    label: "Blog",
    singular: "Post",
    order: "published_at",
    ascending: false,
    categorySelect: true,
    list: [
      { key: "title", header: "Title" },
      { key: "status", header: "Status" },
      { key: "published_at", header: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", full: true },
      { name: "slug", label: "Slug", type: "text", help: "URL: /blog/slug" },
      { name: "author", label: "Author", type: "text" },
      { name: "category_id", label: "Category", type: "select" },
      { name: "reading_minutes", label: "Reading minutes", type: "number" },
      status,
      {
        name: "published_at",
        label: "Publish date (ISO)",
        type: "text",
        placeholder: "2026-07-01T09:00:00.000Z",
      },
      { name: "featured_image", label: "Featured image", type: "image", full: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", full: true },
      { name: "tags", label: "Tags (comma separated)", type: "tags", full: true },
      { name: "body", label: "Body (HTML)", type: "html", full: true },
      seoField,
    ],
    seo: {
      titleField: "title",
      slugField: "slug",
      bodyFields: ["body", "excerpt"],
      urlPrefix: "/blog/",
    },
  },

  testimonials: {
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    order: "sort_order",
    ascending: true,
    list: [
      { key: "author", header: "Author" },
      { key: "source", header: "Source" },
      { key: "status", header: "Status" },
    ],
    fields: [
      { name: "quote", label: "Quote", type: "textarea", full: true },
      { name: "author", label: "Author", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      {
        name: "avatar",
        label: "Photo / avatar",
        type: "image",
        full: true,
        help: "Client's photo or company logo. Leave empty to show their initials.",
      },
      {
        name: "source",
        label: "Source",
        type: "select",
        options: ["direct", "upwork", "fiverr"],
      },
      { name: "rating", label: "Rating (1–5)", type: "number" },
      featured,
      sortOrder,
      status,
    ],
  },

  services: {
    table: "services",
    label: "Services",
    singular: "Service",
    order: "sort_order",
    ascending: true,
    list: [
      { key: "title", header: "Title" },
      { key: "group_name", header: "Group" },
      { key: "status", header: "Status" },
    ],
    fields: [
      {
        name: "group_name",
        label: "Group",
        type: "select",
        options: ["Build", "Secure", "Grow"],
      },
      { name: "title", label: "Title", type: "text", full: true },
      { name: "description", label: "Description", type: "textarea", full: true },
      {
        name: "items",
        label: "Items (one per line)",
        type: "lines",
        full: true,
      },
      sortOrder,
      status,
    ],
  },

  faqs: {
    table: "faqs",
    label: "FAQs",
    singular: "FAQ",
    order: "sort_order",
    ascending: true,
    list: [
      { key: "question", header: "Question" },
      { key: "status", header: "Status" },
    ],
    fields: [
      { name: "question", label: "Question", type: "text", full: true },
      { name: "answer", label: "Answer", type: "textarea", full: true },
      sortOrder,
      status,
    ],
  },
};

export function getCollection(slug: string): Collection | null {
  return collections[slug] ?? null;
}
