import type { BlockValue, PageSlug } from "@/lib/cms/types";

/**
 * content_blocks defaults — the signed-off site copy, VERBATIM from the
 * Website Copy doc (v1). This is the fallback the site renders until the CMS
 * overrides a block. Every headline/paragraph/list here is editable in /admin.
 * Nothing is invented as fact.
 */
export const defaultBlocks: Record<PageSlug, Record<string, BlockValue>> = {
  // ── HOME ──────────────────────────────────────────────────────────────────
  home: {
    "meta.title": {
      text: "Sefat Hossain — Secure, High-Performance Websites | WordPress Security & Development",
    },
    "meta.description": {
      text: "I build and protect high-performance WordPress, Elementor, and Shopify websites — secure from day one and looked after long after launch. Get a free security audit.",
    },
    "hero.kicker": { text: "WordPress Security & Development" },
    "hero.kicker_icon": { text: "shield" },
    "hero.headline": { text: "Websites, built to be trusted." },
    "hero.subhead": {
      text: "I build high-performance websites and protect them from day one — then keep them secure, fast, and growing long after launch. The developer you keep, not the one who disappears.",
    },
    "hero.cta_primary": { text: "Get your free security audit" },
    "hero.cta_secondary": { text: "View my work" },
    "hero.person_name": { text: "Sefat Hossain" },
    "hero.person_role": { text: "WordPress Security Expert" },

    "trust.text": {
      text: "Trusted by business owners, agencies, startups, and e-commerce stores who treat their website as more than a brochure.",
    },

    "bsg.kicker": { text: "Build · Secure · Grow" },
    "bsg.headline": {
      text: "A website isn't finished at launch. That's where the real work begins.",
    },
    "bsg.build.title": { text: "Build." },
    "bsg.build.body": {
      text: "Premium, high-performance sites in WordPress, Elementor, and Shopify — designed to convert, not just to exist.",
    },
    "bsg.secure.title": { text: "Secure." },
    "bsg.secure.body": {
      text: "Hardened and protected from the start. Malware removed, attacks prevented, trust kept intact.",
    },
    "bsg.grow.title": { text: "Grow." },
    "bsg.grow.body": {
      text: "Maintained and optimized over time, so your site becomes an asset that supports the business — not a liability that surprises you.",
    },

    "work.kicker": { text: "Featured work" },
    "work.headline": { text: "Real problems, quietly solved." },
    "work.subhead": {
      text: "From hacked sites brought back online to stores rebuilt to sell — here's a look at what that work actually involves.",
    },
    "work.cta": { text: "See all case studies" },

    "belief.kicker": { text: "The belief" },
    "belief.headline": {
      text: "Most people think launching a website is the finish line. I think it's the starting line.",
    },
    "belief.body": {
      text: "A website should be secure, fast, easy to manage, and built to support real growth. Anyone can put a site online. Keeping it safe, quick, and working for your business — month after month — is the part that actually matters. That's the part I care about.",
    },

    "testimonials.kicker": { text: "My clients say" },
    "testimonials.headline": { text: "Client words speak louder than my claims." },
    // Social-proof stat — leave the number blank until it's a real figure.
    "testimonials.stat_number": { text: "" },
    "testimonials.stat_label": { text: "Happy clients" },
    "testimonials.stat_subtext": { text: "Building secure sites for people and brands." },
    // Slider controls — editable from Pages → Home.
    "testimonials.slider_autoplay": { text: "true" },
    "testimonials.slider_interval": { text: "6" },

    "audit.kicker": { text: "Free security audit" },
    "audit.headline": {
      text: "Is your website actually secure? Most owners don't know until it's too late.",
    },
    "audit.body": {
      text: "Get a free security audit. I'll check your site for the common vulnerabilities attackers look for, and send you a plain-language report on what's exposed and what to fix — no obligation, no jargon.",
    },
    "audit.cta": { text: "Get my free audit" },

    "final.headline": {
      text: "Let's make your website something you never have to worry about.",
    },
    "final.cta_primary": { text: "Book a call" },
    "final.cta_secondary": { text: "Start a project" },

    // Agency feature — Get Shielded (Sefat's team). Clear the URL to hide the band.
    "getshielded.eyebrow": { text: "Agency partner" },
    "getshielded.blurb": {
      text: "Part of Get Shielded — a WordPress security, design, development & lead-marketing studio building trusted, high-performing websites.",
    },
    "getshielded.cta": { text: "Visit Get Shielded" },
    "getshielded.url": { text: "https://getshielded.agency" },
    "getshielded.logo": {
      url: "/images/getshielded-logo.svg",
      alt: "Get Shielded",
    },
  },

  // ── SERVICES ──────────────────────────────────────────────────────────────
  services: {
    "meta.title": {
      text: "Services — WordPress Security, Elementor & Shopify Development | Sefat Hossain",
    },
    "meta.description": {
      text: "Website development, security hardening, malware removal, and ongoing care plans for WordPress, Elementor, and Shopify. Built secure, kept secure.",
    },
    "hero.kicker": { text: "Services" },
    "hero.h1": { text: "Build it right. Keep it safe. Help it grow." },
    "intro.text": {
      text: "I work with businesses that need more than a website that just looks good on launch day. Everything I offer follows the same principle: build it properly, protect it from the start, and support it for the long run.",
    },
    "grow.note": {
      text: "The part most freelancers skip — and the part that matters most. A monthly care plan keeps your site secure, updated, backed up, and monitored, so problems get caught before they become emergencies.",
    },
    "pricing.note": {
      text: "Every site is different. Rather than a one-size box, we'll scope a care plan to what your site actually needs — start with a free audit or a quick call.",
    },
    "cta.headline": { text: "Not sure what you need? Start with a free audit." },
    "cta.primary": { text: "Get your free security audit" },
    "cta.secondary": { text: "Book a call" },
  },

  // ── WORK (index) ──────────────────────────────────────────────────────────
  work: {
    "meta.title": {
      text: "Work & Case Studies — WordPress Security & Website Projects | Sefat Hossain",
    },
    "meta.description": {
      text: "Real recovery stories and website projects — malware removal, security hardening, Elementor builds, Shopify stores, and performance work.",
    },
    "hero.kicker": { text: "Selected work" },
    "hero.h1": { text: "The work, told as it actually happened." },
    "intro.text": {
      text: "Some of my best work is invisible — a hack cleaned up before customers noticed, an attack that never happened because the door was already closed. So instead of just showing screenshots, I'll tell you the story: what the problem was, what I did, and how it turned out.",
    },
    "projects.kicker": { text: "Build gallery" },
    "projects.note": {
      text: "A lighter gallery of build work sits below the case studies. It fills in once the live URLs and screenshots for the Elementor and Shopify projects are in — real proof only, never mock-ups.",
    },
    "cta.text": { text: "Have a project in mind? Let's talk" },
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  about: {
    "meta.title": {
      text: "About Sefat Hossain — WordPress Security Expert",
    },
    "meta.description": {
      text: "I help businesses build, secure, and grow their websites — with a focus on WordPress security, Elementor, and Shopify. Here's how I work and what I believe.",
    },
    "hero.kicker": { text: "About" },
    "hero.h1": {
      text: "I build secure websites businesses can trust and grow with.",
    },
    "story.kicker": { text: "The story" },
    "story.body": {
      text: "It started with curiosity — a fascination with how websites actually work behind the scenes. That pulled me into WordPress security and malware removal, where I spent a lot of time helping businesses recover sites that had been hacked. Seeing what that recovery meant to them — the relief, the trust restored — is what pushed me to go further: into Elementor and Shopify, so I could build complete, secure websites from the ground up, not just fix them after the fact.",
    },
    "belief.kicker": { text: "The belief" },
    "belief.headline": {
      text: "A website should be secure, optimized, easy to manage, and built to grow.",
    },
    "belief.body": {
      text: "Most people treat launching a site as the finish line. I don't. That's the moment the real work starts — keeping it safe, fast, and useful as the business changes around it.",
    },
    "work.kicker": { text: "How I work" },
    "work.body": {
      text: "I'm calm, detail-oriented, and honest — especially when the news isn't good. I'd rather tell you exactly what's wrong and what it'll take to fix it than sell you something you don't need. I work best with clients who value quality, transparency, and a long-term relationship over a quick job.",
    },
    "skills.kicker": { text: "Skills · Stack" },
    "skills.items": {
      items: [
        "WordPress security, malware removal, and hardening",
        "Elementor design and development",
        "Shopify store design and customization",
        "Performance optimization and technical SEO",
      ],
    },
    "outside.kicker": { text: "Outside work" },
    "outside.body": {
      text: "Away from the screen, I play cricket and stay endlessly curious — I spend a lot of time researching cybersecurity, new web technologies, and how businesses actually grow. The learning never really stops, and I like it that way.",
    },
    "credentials.kicker": { text: "Credentials" },
    "credentials.body": {
      text: "I'm currently expanding my professional certifications while continuing to invest in advanced, hands-on learning.",
    },
    "cta.primary": { text: "Work with me" },
    "cta.secondary": { text: "Download CV" },
  },

  // ── BLOG (index) ──────────────────────────────────────────────────────────
  blog: {
    "meta.title": {
      text: "Blog — WordPress Security, Speed & Web Tips | Sefat Hossain",
    },
    "meta.description": {
      text: "Practical, plain-language articles on WordPress security, malware prevention, website speed, and getting more from your site.",
    },
    "hero.kicker": { text: "Writing" },
    "hero.h1": { text: "Practical advice for keeping your website safe and fast." },
    "intro.text": {
      text: "No jargon, no fear-selling — just clear, useful writing on the things business owners actually run into: hacked sites, slow pages, security worries, and how to stay ahead of them.",
    },
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  contact: {
    "meta.title": { text: "Contact — Let's Build Something Secure | Sefat Hossain" },
    "meta.description": {
      text: "Have a project, a hacked site, or a website that needs care? Book a call or send a message — I reply personally.",
    },
    "hero.kicker": { text: "Contact" },
    "hero.h1": { text: "Let's talk about your website." },
    "intro.text": {
      text: "Whether you're launching something new, recovering from a hack, or just want your site properly looked after — tell me what's going on. I read every message myself and reply personally.",
    },
  },

  // ── SECURITY AUDIT ────────────────────────────────────────────────────────
  "security-audit": {
    "meta.title": {
      text: "Free WordPress Security Audit — Find Out What's Exposed | Sefat Hossain",
    },
    "meta.description": {
      text: "Get a free, no-obligation security audit of your WordPress site. I'll check for common vulnerabilities and send a plain-language report on what to fix.",
    },
    "hero.kicker": { text: "Free security audit" },
    "hero.h1": { text: "Find out what's exposed — before someone else does." },
    "offer.body": {
      text: "Most website owners have no idea how exposed their site is until something goes wrong. A free security audit changes that. I'll review your WordPress site for the common weaknesses attackers look for, and send you a clear, jargon-free report — what's at risk, and what to do about it.",
    },
    "what.kicker": { text: "What you get" },
    "what.items": {
      items: [
        "A check for common vulnerabilities, outdated software, and weak points.",
        "A plain-language report you can actually understand.",
        "Clear next steps — whether you fix them yourself or have me handle it.",
        "No obligation, no pressure, no jargon.",
      ],
    },
    "reassurance.text": {
      text: "Your details stay private. I use them only to run your audit and send your report — nothing else.",
    },
    "cta.text": { text: "Get my free audit" },
  },
};
