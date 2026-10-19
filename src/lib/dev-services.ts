/**
 * Web-development service pages (/services/<slug>), rendered by
 * app/(public)/services/[slug]/page.tsx. The site's primary focus stays
 * WordPress security; these are the second pillar, and every one leans on the
 * same differentiator: sites built secure from day one, by someone who cleans
 * hacked sites for a living.
 *
 * Keep copy factual: no invented client counts, results or prices.
 */

export type DevService = {
  slug: string;
  /** Short name for nav, cards, breadcrumbs, OG card. */
  name: string;
  /** One line for cards and the OG subtitle. */
  desc: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickAnswer: string;
  /** "Who it's for" bullets. */
  fit: string[];
  included: string[];
  /** Heading for the `included` list (default: "What's included in …"). */
  includedHeading?: string;
  /** How security is built in — the differentiator. */
  securityAngle: string;
  process: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  serviceType: string;
  /**
   * Optional price-range table (cost guides). Market ranges, clearly labelled
   * as typical — not a quote.
   */
  pricing?: { tier: string; range: string; note: string }[];
  /** Slug of a related published case study in /work, if there is one. */
  caseStudy?: { slug: string; label: string };
};

const SHARED_PROCESS_TAIL = {
  title: "Launch, handover and care",
  body: "I launch with backups, monitoring and security in place, walk you through managing the site yourself, and stay available for updates and support so it doesn't quietly fall behind.",
};

export const DEV_SERVICES: DevService[] = [
  {
    slug: "wordpress-website-development",
    caseStudy: { slug: "elementor-business-website", label: "A premium business website build" },
    name: "WordPress Website Development",
    desc: "Custom WordPress websites for US businesses — fast, easy to manage, and secure from day one.",
    metaTitle: "Custom WordPress Website Development",
    metaDescription:
      "Custom WordPress website development for US businesses: fast, SEO-ready, easy to manage, and built secure from day one by a WordPress security expert.",
    h1: "WordPress Website Development",
    intro:
      "A custom WordPress website built around your business, not a template. I design and develop sites that load fast, rank well, are easy for your team to update, and are hardened against attacks before they ever go live.",
    quickAnswer:
      "WordPress website development is designing and building a WordPress site to fit your business: the theme or custom design, the pages and content structure, the plugins and integrations you need, and the hosting setup. A good build also covers speed, SEO foundations, accessibility and security — so the site performs well and stays safe after launch.",
    fit: [
      "Businesses replacing an outdated or slow website",
      "Companies that want to edit their own content without a developer",
      "Service businesses that need lead forms, booking or quote requests",
      "Owners who have been hacked before and want a site built properly this time",
    ],
    included: [
      "Custom design or a tailored premium theme",
      "Responsive, mobile-first layouts",
      "On-page SEO foundations: structure, metadata, schema, sitemap",
      "Speed optimization and Core Web Vitals tuning",
      "Contact, quote and booking forms with spam protection",
      "Security hardening, backups and monitoring before launch",
      "Training so your team can manage content",
    ],
    securityAngle:
      "Most WordPress hacks come from the same few mistakes: abandoned plugins, weak admin access, nulled themes and no backups. Because I spend my days cleaning up after those mistakes, every site I build ships with a minimal, vetted plugin set, locked-down logins, a firewall, automated off-site backups and update monitoring.",
    process: [
      {
        title: "Discovery and plan",
        body: "We pin down your goals, audience, pages and the integrations you need, and agree on scope and timeline before any design starts.",
      },
      {
        title: "Design",
        body: "I design the key pages mobile-first, around how your customers actually decide, and refine them with your feedback.",
      },
      {
        title: "Build",
        body: "I develop the site on a clean, lightweight stack, with only the plugins it genuinely needs, and set up the content structure so editing stays simple.",
      },
      {
        title: "Test and harden",
        body: "Speed, mobile, forms, SEO basics and security are checked and fixed before launch — not after the first problem.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "How long does it take to build a WordPress website?",
        answer:
          "A typical small-business site takes a few weeks from discovery to launch. Larger sites with custom features or many pages take longer. You get a clear timeline before work starts.",
      },
      {
        question: "Will I be able to update the website myself?",
        answer:
          "Yes. The site is set up so you can edit pages, posts and images without touching code, and you get a walkthrough at handover.",
      },
      {
        question: "Can you redesign my existing WordPress site instead of starting over?",
        answer:
          "Often, yes. If the existing content and structure are worth keeping, a redesign can reuse them. I'll also check the current site for malware or security issues before building on it.",
      },
      {
        question: "Do you work with businesses across the United States?",
        answer:
          "Yes. I work remotely with US businesses in every time zone and schedule calls around your business hours.",
      },
    ],
    serviceType: "WordPress website development",
  },
  {
    slug: "shopify-store-development",
    caseStudy: { slug: "shopify-store", label: "A Shopify store built to sell" },
    name: "Shopify Store Development",
    desc: "Shopify stores designed to convert — set up, customized and secured for US sellers.",
    metaTitle: "Shopify Store Development & Customization",
    metaDescription:
      "Shopify store development for US sellers: theme customization, product and collection setup, payments, shipping and apps, built to convert and easy to run.",
    h1: "Shopify Store Development",
    intro:
      "A Shopify store that reflects your brand and makes buying easy. I set up and customize your store — theme, products, collections, payments, shipping and apps — so you launch with a store that sells, not just one that exists.",
    quickAnswer:
      "Shopify store development is setting up and customizing a Shopify store: choosing and tailoring the theme, structuring products and collections, configuring payments, taxes and shipping, adding the right apps, and optimizing for speed and conversions. The goal is a store that is easy for customers to buy from and easy for you to run.",
    fit: [
      "Brands launching their first online store",
      "Sellers moving from another platform to Shopify",
      "Stores with a default theme that need a branded, higher-converting design",
      "Owners who want a store they can manage without a developer on call",
    ],
    included: [
      "Theme selection and brand customization",
      "Product, variant and collection setup",
      "Navigation and search designed around how customers shop",
      "Payments, taxes and shipping configuration",
      "App selection without bloat",
      "Speed and mobile optimization",
      "Account security: staff permissions and two-factor login",
    ],
    securityAngle:
      "Shopify handles server security, but the store owner's side still matters: staff accounts with too much access, no two-factor login and unvetted apps are how stores get compromised. I set up least-privilege staff roles, enforce two-factor authentication and keep the app list to what you actually use.",
    process: [
      {
        title: "Plan the store",
        body: "We map your catalog, customer journey, shipping rules and must-have features before anything is built.",
      },
      {
        title: "Design and customize",
        body: "I tailor the theme to your brand and design product and collection pages around clear calls to action.",
      },
      {
        title: "Set up products and operations",
        body: "Products, collections, payments, taxes, shipping and apps are configured and tested end to end, including checkout.",
      },
      {
        title: "Optimize and test",
        body: "Speed, mobile layout and the full purchase flow are tested on real devices before launch.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Should I use Shopify or WooCommerce?",
        answer:
          "Shopify is usually simpler to run and maintain; WooCommerce gives more control and no platform fees but needs more upkeep and security work. I'll recommend the one that fits your catalog, budget and how hands-on you want to be.",
      },
      {
        question: "Can you migrate my existing store to Shopify?",
        answer:
          "Yes. Products, customers and order history can usually be migrated, and old URLs redirected so you keep your search rankings.",
      },
      {
        question: "Will I be able to manage the store myself?",
        answer:
          "Yes. You'll be able to add products, run discounts and manage orders yourself, and you get a walkthrough at handover.",
      },
    ],
    serviceType: "Shopify store development",
  },
  {
    slug: "elementor-website-design",
    caseStudy: { slug: "elementor-business-website", label: "A premium Elementor business website" },
    name: "Elementor Website Design",
    desc: "Premium, custom Elementor websites — not cookie-cutter templates — that you can edit yourself.",
    metaTitle: "Elementor Website Design & Development",
    metaDescription:
      "Custom Elementor website design for US businesses: premium, fast and mobile-first, with a clean structure your team can edit without breaking the layout.",
    h1: "Elementor Website Design",
    intro:
      "Elementor makes WordPress easy to edit — but most Elementor sites end up slow, bloated and fragile. I design custom Elementor websites that look premium, load fast and are structured so your team can update them without breaking the layout.",
    quickAnswer:
      "Elementor website design is building a WordPress site with the Elementor page builder: custom layouts, reusable templates and global styles instead of one-off pages. Done well, it gives you a visual editor you can use yourself while keeping the site fast, consistent and maintainable.",
    fit: [
      "Businesses that want to edit pages visually without code",
      "Existing Elementor sites that are slow or hard to manage",
      "Brands that need a premium look without a fully custom build",
    ],
    included: [
      "Custom design built on global colors, fonts and templates",
      "Reusable sections so new pages stay on-brand",
      "Performance tuning: lean widgets, optimized images, caching",
      "Mobile and tablet layouts designed, not just stacked",
      "SEO-ready headings, metadata and schema",
      "Secure setup: vetted add-ons only, no nulled Elementor Pro",
    ],
    securityAngle:
      "Nulled (pirated) Elementor Pro and abandoned add-on packs are one of the most common ways I see WordPress sites infected. Every Elementor build I do uses licensed Elementor Pro, a minimal set of maintained add-ons, and the same hardening as any site I protect.",
    process: [
      {
        title: "Plan and structure",
        body: "We agree on pages, content and goals, and I set up global styles and templates first so the whole site stays consistent.",
      },
      {
        title: "Design",
        body: "Key pages are designed for desktop and mobile, then refined with your feedback.",
      },
      {
        title: "Build lean",
        body: "Pages are built from reusable sections with the fewest widgets needed, so the site stays fast and easy to edit.",
      },
      {
        title: "Optimize and secure",
        body: "Speed, mobile, SEO basics and security are checked before launch.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Is Elementor bad for site speed?",
        answer:
          "It can be when sites stack too many widgets and add-ons. Built lean, with global styles and optimized assets, an Elementor site can pass Core Web Vitals.",
      },
      {
        question: "Can you fix or speed up my existing Elementor site?",
        answer:
          "Yes. I can audit an existing Elementor site, remove bloat, rebuild heavy sections and check it for security problems such as nulled plugins.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes — that's the main point of Elementor. Templates and global styles let you add and edit pages while staying on-brand.",
      },
    ],
    serviceType: "Elementor website design",
  },
  {
    slug: "custom-web-development",
    name: "Custom Web Development (Next.js & React)",
    desc: "Custom websites and web apps in Next.js and React — fast, scalable and secure by design.",
    metaTitle: "Custom Web Development with Next.js & React",
    metaDescription:
      "Custom web development with Next.js and React for US businesses: fast marketing sites, dashboards and web apps, built with security and SEO from the start.",
    h1: "Custom Web Development with Next.js & React",
    intro:
      "When a template site isn't enough, I build custom websites and web apps with Next.js and React — fast, SEO-friendly and secure by design. From high-performance marketing sites with an easy CMS to dashboards, portals and custom tools.",
    quickAnswer:
      "Custom web development means building a website or web application from code rather than a page builder, using a modern stack such as Next.js and React. It suits projects that need top performance, custom features, integrations or app-like functionality that WordPress plugins can't deliver cleanly.",
    fit: [
      "Businesses that need features a theme or plugin can't handle",
      "Marketing sites where speed and Core Web Vitals really matter",
      "Client portals, dashboards and internal tools",
      "Teams that want a custom site with a simple CMS to edit content",
    ],
    included: [
      "Next.js and React development",
      "Headless CMS or a custom admin for editing content",
      "Database and API integrations",
      "Authentication and role-based access",
      "SEO built in: server rendering, metadata, schema, sitemaps",
      "Security headers, input validation and dependency hygiene",
      "Deployment on modern hosting with previews for every change",
    ],
    securityAngle:
      "Custom code has no plugin marketplace to blame — so security has to be designed in: validated inputs, least-privilege data access, secure authentication, strict security headers and dependencies kept up to date. That's the standard I build to, including this website.",
    process: [
      {
        title: "Scope and architecture",
        body: "We define features, users and integrations, and I propose a stack and architecture that fits the budget and the long term.",
      },
      {
        title: "Design and prototype",
        body: "Key screens are designed and, where useful, prototyped so you can see how it works before full development.",
      },
      {
        title: "Develop in stages",
        body: "I build in small, reviewable steps with a preview link for every change, so you see progress and give feedback early.",
      },
      {
        title: "Test, secure and launch",
        body: "Performance, accessibility, security and SEO are checked before launch, with monitoring in place from day one.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Should I choose WordPress or a custom Next.js site?",
        answer:
          "WordPress is usually the better fit for content-driven sites that a team edits often. A custom Next.js build makes sense when you need top performance, custom features or app-like behavior. I'll recommend whichever fits your goals and budget.",
      },
      {
        question: "Can I still edit content on a custom site?",
        answer:
          "Yes. Custom sites can include a CMS or admin panel so you can update pages, posts and images without a developer.",
      },
      {
        question: "Do you build web applications, not just websites?",
        answer:
          "Yes — dashboards, client portals, booking or quoting tools and other custom web apps, with authentication and database integration.",
      },
    ],
    serviceType: "Custom web development",
  },
  {
    slug: "website-speed-optimization",
    caseStudy: { slug: "performance-optimization", label: "Making a slow website fast" },
    name: "Website Speed Optimization",
    desc: "Make a slow WordPress site fast — Core Web Vitals, caching, images and hosting tuned.",
    metaTitle: "WordPress Speed Optimization Service",
    metaDescription:
      "WordPress speed optimization for US businesses: fix slow load times and Core Web Vitals (LCP, CLS, INP) with image, caching, code and hosting improvements.",
    h1: "WordPress Speed Optimization",
    intro:
      "A slow site loses visitors before they see what you offer, ranks lower and wastes ad spend. I find what actually slows your site down and fix it — images, caching, code, plugins and hosting — and measure the result against Core Web Vitals.",
    quickAnswer:
      "Website speed optimization is finding and fixing what makes pages load slowly: oversized images, render-blocking scripts and styles, plugin bloat, missing caching and slow hosting. Results are measured with Core Web Vitals — LCP (loading), INP (responsiveness) and CLS (visual stability) — which Google uses as a ranking signal.",
    fit: [
      "Sites that feel slow on mobile or fail Core Web Vitals in Search Console",
      "WordPress sites weighed down by page builders and plugins",
      "Stores where slow pages are costing sales",
      "Sites that got slower after a hack or a rushed redesign",
    ],
    included: [
      "Core Web Vitals and PageSpeed audit (lab and real-user data)",
      "Image compression, modern formats and lazy loading",
      "Caching and CDN setup",
      "Removing or replacing heavy plugins and scripts",
      "CSS and JavaScript cleanup",
      "Database cleanup",
      "Hosting review and recommendations",
    ],
    securityAngle:
      "A sudden slowdown is sometimes a symptom, not the problem: malware, spam injections and crypto-mining scripts all make sites slower. Every speed audit I do includes a malware check, so you're not optimizing an infected site.",
    process: [
      {
        title: "Measure",
        body: "I benchmark key pages with PageSpeed and real-user data where available, and pinpoint what's slowing each one down.",
      },
      {
        title: "Fix the biggest wins first",
        body: "Images, caching and render-blocking resources usually give the largest gains, so they come first.",
      },
      {
        title: "Clean up code and plugins",
        body: "Heavy or redundant plugins and scripts are removed or replaced, and the database is cleaned.",
      },
      {
        title: "Re-test",
        body: "Pages are re-measured on mobile and desktop, and you get a before-and-after report.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Does site speed affect Google rankings?",
        answer:
          "Yes. Core Web Vitals are part of Google's page experience signals, and faster pages also keep more visitors, which helps conversions either way.",
      },
      {
        question: "Can you speed up a site built with Elementor or another page builder?",
        answer:
          "Yes. Page-builder sites can usually be made much faster by trimming widgets and add-ons, optimizing assets and adding proper caching.",
      },
      {
        question: "Will speed optimization break my website?",
        answer:
          "Changes are tested on a backup or staging copy first, and a full backup is taken before anything goes live.",
      },
    ],
    serviceType: "Website speed optimization",
  },
  {
    slug: "wordpress-website-cost",
    includedHeading: "What affects the price",
    name: "WordPress Website Cost",
    desc: "What a WordPress website costs in the US in 2026, from DIY to custom builds, and what drives the price.",
    metaTitle: "How Much Does a WordPress Website Cost? (2026)",
    metaDescription:
      "How much does a WordPress website cost in the US? Typical 2026 ranges from DIY to freelancer and agency builds, plus what drives the price up or down.",
    h1: "How Much Does a WordPress Website Cost in 2026?",
    intro:
      "Most US small-business WordPress websites built by a professional cost somewhere between a few thousand and the low tens of thousands of dollars. The range is wide because \"a website\" can mean five pages or a full store. Here is what each level typically costs and what you actually get for the money.",
    quickAnswer:
      "In the US, a professionally built WordPress website typically costs about $2,000–5,000 for a simple small-business site, $5,000–15,000 for a larger custom site, and $15,000+ for complex builds or e-commerce. Ongoing costs (hosting, plugins, maintenance and security) usually add $50–300 per month. DIY is cheaper up front but costs your time and often more later.",
    pricing: [
      {
        tier: "DIY with a theme",
        range: "$100–1,000",
        note: "Hosting, a premium theme and plugins. Cheapest, but you do the design, setup, security and upkeep yourself.",
      },
      {
        tier: "Simple small-business site",
        range: "$2,000–5,000",
        note: "5–10 pages on a tailored theme, contact forms, basic SEO and a mobile-friendly design.",
      },
      {
        tier: "Custom business site",
        range: "$5,000–15,000",
        note: "Custom design, more pages and templates, integrations (CRM, booking), stronger SEO and performance work.",
      },
      {
        tier: "Complex site or e-commerce",
        range: "$15,000+",
        note: "WooCommerce stores, memberships, custom functionality or large content migrations.",
      },
      {
        tier: "Ongoing care",
        range: "$50–300 / month",
        note: "Hosting, premium plugin licences, updates, backups, security monitoring and support.",
      },
    ],
    fit: [
      "Business owners budgeting for a new website",
      "Teams comparing freelancer, agency and DIY quotes",
      "Owners deciding between a redesign and a rebuild",
    ],
    included: [
      "Number of pages and unique templates",
      "Custom design versus a tailored theme",
      "Features and integrations (forms, booking, CRM, payments)",
      "Content: who writes it, and migrating existing content",
      "E-commerce: products, payments and shipping setup",
      "SEO, speed and accessibility work",
      "Security hardening, backups and ongoing maintenance",
    ],
    securityAngle:
      "The cheapest quote often skips the parts you only notice later: security hardening, backups and updates. Those are exactly the gaps I clean up after when sites get hacked. Every site I build includes them, so the price you see covers a site that stays online.",
    process: [
      {
        title: "Tell me what you need",
        body: "A short call or message about your goals, pages, features and timeline.",
      },
      {
        title: "Get a fixed quote",
        body: "You get a clear, itemized quote and timeline — no hourly surprises.",
      },
      {
        title: "Design and build",
        body: "Design first, then development, with your feedback at each stage.",
      },
      {
        title: "Launch secure",
        body: "Speed, SEO basics and security are checked before launch.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Why do WordPress website quotes vary so much?",
        answer:
          "Quotes differ in scope (pages, features, content), in who does design versus just setup, and in whether security, SEO, speed and support are included. Compare what is included, not just the number.",
      },
      {
        question: "What are the ongoing costs of a WordPress website?",
        answer:
          "Hosting, domain, premium plugin or theme licences, and maintenance (updates, backups, security monitoring). For most small businesses that is roughly $50–300 per month in total.",
      },
      {
        question: "Is WordPress cheaper than Shopify or a custom site?",
        answer:
          "For content-driven business sites WordPress is usually the most cost-effective. Shopify can be cheaper to run for straightforward stores, and a custom Next.js build costs more up front but suits sites needing custom features or top performance.",
      },
      {
        question: "How much do you charge?",
        answer:
          "It depends on scope, so I quote each project individually after a short call. You get a fixed, itemized quote before any work starts.",
      },
    ],
    serviceType: "WordPress website development",
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    desc: "Redesign an outdated or slow website without losing your Google rankings.",
    metaTitle: "Website Redesign Services (Keep Your Rankings)",
    metaDescription:
      "Website redesign for US businesses: modern design, faster pages and better conversions, with redirects and SEO handled so you keep your Google rankings.",
    h1: "Website Redesign Services",
    intro:
      "Your website looks dated, loads slowly or no longer reflects your business. I redesign it into a fast, modern site that converts — and handle the technical side carefully, so you keep the Google rankings and traffic you already have.",
    quickAnswer:
      "A website redesign updates a site's design, structure and technology to improve how it looks, loads and converts. The risky part is SEO: changed URLs, removed pages or lost content can drop rankings overnight. A safe redesign maps every old URL, sets up redirects and keeps or improves the content Google already ranks.",
    fit: [
      "Sites that look outdated or don't work well on mobile",
      "Slow sites failing Core Web Vitals",
      "Sites that get traffic but few leads",
      "Businesses whose services or branding have changed",
    ],
    included: [
      "Audit of the current site, content and rankings",
      "New design, mobile-first",
      "URL mapping and 301 redirects to protect SEO",
      "Content restructuring and improvement",
      "Speed and Core Web Vitals optimization",
      "Malware and security check of the old site before migration",
      "Post-launch ranking and error monitoring",
    ],
    securityAngle:
      "Redesigns are a common moment for infections to carry over: old backdoors get copied into the new site along with the content. Every redesign starts with a security check of the existing site, so you move the content — not the malware.",
    process: [
      {
        title: "Audit what you have",
        body: "I review the current site, its traffic, top-ranking pages and technical issues, so we know what must be kept.",
      },
      {
        title: "Plan structure and redirects",
        body: "New sitemap and a URL map from every old page to its new home.",
      },
      {
        title: "Design and build",
        body: "The new design is built and reviewed on a staging copy, not your live site.",
      },
      {
        title: "Launch and monitor",
        body: "Redirects go live with the new site, and I watch Search Console for errors and ranking changes after launch.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Will a website redesign hurt my Google rankings?",
        answer:
          "It can if URLs change without redirects or content is removed. With a URL map, 301 redirects and preserved content, rankings are usually kept, and often improve thanks to better speed and structure.",
      },
      {
        question: "Can you redesign my site without changing platforms?",
        answer:
          "Yes. Many redesigns keep WordPress and refresh the theme, structure and content. If another platform fits better, I'll explain why before recommending a move.",
      },
      {
        question: "How long does a redesign take?",
        answer:
          "Most small-business redesigns take a few weeks, depending on page count and content changes. You get a timeline up front.",
      },
    ],
    serviceType: "Website redesign",
  },
  {
    slug: "wordpress-maintenance",
    name: "WordPress Maintenance & Care Plans",
    desc: "Monthly WordPress care: updates, backups, security monitoring and fixes — so your site stays fast and safe.",
    metaTitle: "WordPress Maintenance & Care Plans (US)",
    metaDescription:
      "WordPress maintenance and care plans for US businesses: safe updates, daily backups, security and uptime monitoring, speed checks and fast help when needed.",
    h1: "WordPress Maintenance & Care Plans",
    intro:
      "Most hacked WordPress sites I clean weren't attacked because they were important — they were attacked because nobody was updating them. A care plan keeps your site updated, backed up, monitored and fast, every month, so problems get caught before they cost you.",
    quickAnswer:
      "WordPress maintenance is the ongoing work that keeps a site secure and working: updating WordPress core, plugins and themes safely, taking off-site backups, monitoring for malware and downtime, checking speed and fixing issues. A care plan bundles that into a predictable monthly service.",
    fit: [
      "Business sites with nobody in charge of updates",
      "Owners who have been hacked before",
      "WooCommerce stores where downtime costs sales",
      "Sites built by a developer who is no longer around",
    ],
    included: [
      "Safe core, plugin and theme updates (tested, with rollback)",
      "Daily off-site backups",
      "Malware scanning and security monitoring",
      "Uptime monitoring and alerts",
      "Monthly speed and health checks",
      "Small content edits and fixes",
      "Priority help if something goes wrong",
    ],
    securityAngle:
      "Because I do malware removal, maintenance here is built around preventing the problems I see every week: abandoned plugins, missed updates, weak admin accounts and no working backups. If something does slip through, cleanup is handled by the same person who has been watching the site.",
    process: [
      {
        title: "Onboarding audit",
        body: "I check the site's security, plugins, backups and speed, and fix anything urgent before the plan starts.",
      },
      {
        title: "Monthly care",
        body: "Updates, backups, scans and monitoring run on a schedule, with updates tested before they go live.",
      },
      {
        title: "Monthly report",
        body: "A short plain-English summary of what was updated, checked and fixed.",
      },
      {
        title: "Fast help",
        body: "When something breaks or looks wrong, you have someone who already knows your site.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "Why do WordPress sites need ongoing maintenance?",
        answer:
          "WordPress, plugins and themes release updates constantly, many of them security fixes. Sites that fall behind on updates are the easiest targets for automated attacks.",
      },
      {
        question: "Can't I just turn on automatic updates?",
        answer:
          "Auto-updates help, but they can break a site without anyone noticing, and they don't cover backups, malware scanning or downtime. A care plan tests updates and watches the whole site.",
      },
      {
        question: "Do you maintain sites you didn't build?",
        answer:
          "Yes. Every new site starts with an onboarding audit, and any existing malware or security issues are cleaned up first.",
      },
    ],
    serviceType: "WordPress maintenance",
  },
  {
    slug: "woocommerce-development",
    name: "WooCommerce Development",
    desc: "WooCommerce stores built on WordPress: products, payments, shipping and checkout, fast and secure.",
    metaTitle: "WooCommerce Store Development (US)",
    metaDescription:
      "WooCommerce development for US businesses: custom WordPress stores with products, payments, shipping and a fast, secure checkout you fully own and control.",
    h1: "WooCommerce Store Development",
    intro:
      "WooCommerce turns WordPress into a full online store that you own outright — no platform lock-in. I build WooCommerce stores that are fast, easy to manage and secure, with a checkout customers trust.",
    quickAnswer:
      "WooCommerce development is building an online store on WordPress with the WooCommerce plugin: setting up products and variations, payments, taxes and shipping, the theme and checkout, and the extensions the store needs. Because WooCommerce stores handle orders and customer data, speed and security matter as much as design.",
    fit: [
      "Businesses that already run on WordPress and want to sell online",
      "Stores that need more flexibility or ownership than Shopify offers",
      "Content-heavy brands that want blog and store in one place",
      "Existing WooCommerce stores that are slow or hard to manage",
    ],
    included: [
      "Store setup, theme and checkout design",
      "Products, variations, categories and filters",
      "Payments (Stripe, PayPal), taxes and shipping",
      "Speed optimization for product and cart pages",
      "Order, email and inventory configuration",
      "Security: hardened checkout, card-skimmer protection, backups",
      "Training to manage products and orders",
    ],
    securityAngle:
      "WooCommerce stores are prime targets for card-skimming malware injected into checkout. I remove those infections for a living, so every store I build ships with a hardened checkout, a firewall, file-integrity monitoring and backups.",
    process: [
      {
        title: "Plan the store",
        body: "We map products, payments, shipping, taxes and the customer journey before building.",
      },
      {
        title: "Design",
        body: "Shop, product, cart and checkout pages are designed around clarity and trust.",
      },
      {
        title: "Build and configure",
        body: "WooCommerce, payments, shipping and extensions are set up and tested end to end with real test orders.",
      },
      {
        title: "Optimize and secure",
        body: "Speed, mobile checkout and security are checked before launch.",
      },
      SHARED_PROCESS_TAIL,
    ],
    faqs: [
      {
        question: "WooCommerce or Shopify — which is better?",
        answer:
          "WooCommerce gives you full ownership, flexibility and no platform fees, but needs more maintenance and security care. Shopify is simpler to run. I'll recommend the one that fits your products, budget and how hands-on you want to be.",
      },
      {
        question: "Is WooCommerce secure?",
        answer:
          "WooCommerce itself is well maintained; most store hacks come from outdated plugins, weak admin access or nulled extensions. Proper hardening and maintenance make it secure.",
      },
      {
        question: "Can you add WooCommerce to my existing WordPress site?",
        answer:
          "Yes. I can add a store to an existing site, after checking it for security issues and speed problems first.",
      },
    ],
    serviceType: "WooCommerce development",
  },
];

export function getDevService(slug: string): DevService | undefined {
  return DEV_SERVICES.find((s) => s.slug === slug);
}
