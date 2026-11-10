/**
 * Industry website-design landing pages (/website-design/<slug>): the web
 * development pillar's long-tail entry points ("law firm website design",
 * "roofing website design"…). Each pairs genuinely industry-specific advice
 * with a live concept site the owner built for that industry.
 *
 * Keep copy factual: the demos are labelled concept sites (fictional
 * businesses), and no client counts, results or prices are invented. Prices
 * link to the WordPress website cost guide.
 */

export type IndustryWebsite = {
  slug: string;
  /** Industry noun for headings, e.g. "law firm". */
  industry: string;
  /** Plural for "for <plural>" phrases, e.g. "law firms". */
  plural: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickAnswer: string;
  /** What this industry's site must do, with why. */
  mustHaves: { title: string; body: string }[];
  /** Mistakes specific to this industry's sites. */
  mistakes: string[];
  demo: { name: string; url: string; image: string; blurb: string };
  /** Related build service for the "built with" link. */
  service: { name: string; href: string };
  faqs: { question: string; answer: string }[];
};

export const INDUSTRY_WEBSITES: IndustryWebsite[] = [
  {
    slug: "law-firms",
    industry: "law firm",
    plural: "law firms",
    metaTitle: "Law Firm Website Design for Small & Solo Practices",
    metaDescription:
      "Law firm website design for US small and solo practices: practice-area pages, free case review forms, click-to-call and a secure WordPress build. See a live demo.",
    h1: "Law Firm Website Design",
    intro:
      "Someone searching for a lawyer is usually stressed and comparing three or four firms at once. A law firm website has to answer two questions in seconds, \"can you handle my case?\" and \"how do I reach you right now?\", and then make the call or the case-review form the obvious next step.",
    quickAnswer:
      "A good law firm website has a dedicated page for each practice area, a free case review form and a click-to-call phone number on every page, attorney bios that build trust, and clear contact details for each office. It must load fast on phones, show up in local search, and be built securely because it collects sensitive client information.",
    mustHaves: [
      {
        title: "One page per practice area",
        body: "Car accidents, workplace injury, wrongful death: each gets its own page with what to do next, what the firm handles and how fees work. That is what ranks for \"car accident lawyer in [city]\" and what a worried visitor actually reads.",
      },
      {
        title: "Case review and call, always one tap away",
        body: "A short free case review form, a sticky click-to-call button on mobile and a clear \"available 24/7\" line if the firm offers it. Most legal leads come from phones.",
      },
      {
        title: "Attorney bios that earn trust",
        body: "Real photos, bar admissions, focus areas and a plain-English line about how the attorney works with clients. Visitors are choosing a person, not a logo.",
      },
      {
        title: "Fee and process clarity",
        body: "If the firm works on contingency, say \"no fee unless we win\" early, and show the steps of a case so the visitor knows what happens after they call.",
      },
      {
        title: "Secure intake",
        body: "Case details are confidential. Forms should use HTTPS, spam protection and minimal fields, and the site needs updates, backups and monitoring so it never leaks or gets hacked.",
      },
    ],
    mistakes: [
      "A single \"Practice Areas\" page listing everything, which ranks for nothing",
      "Phone number hidden in the footer on mobile",
      "Stock-photo gavels instead of the actual attorneys",
      "Long intake forms that ask for the whole story before the first call",
    ],
    demo: {
      name: "Marlow & Pryce: personal injury law firm",
      url: "https://law.sefathossain.com/",
      image: "/images/work/concepts/law.jpg",
      blurb: "An Atlanta personal-injury concept site with practice-area pages, a free case review flow and 24/7 call buttons.",
    },
    service: { name: "WordPress website development", href: "/services/wordpress-website-development" },
    faqs: [
      {
        question: "How much does a law firm website cost?",
        answer: "It depends on the number of practice areas, offices and features such as intake forms or live chat. See the WordPress website cost guide for typical US price ranges, and I'll give you a fixed quote once the scope is clear.",
      },
      {
        question: "Can my law firm website rank for local searches?",
        answer: "Yes. A page per practice area and city, fast mobile pages, clear contact details and proper structured data are the foundations. Rankings also depend on reviews and links, which take time to build.",
      },
      {
        question: "Is WordPress secure enough for a law firm?",
        answer: "WordPress is safe when it is built and maintained properly: a small set of trusted plugins, locked-down logins, a firewall, backups and updates. I clean hacked WordPress sites for a living, so every site I build ships with that in place.",
      },
    ],
  },
  {
    slug: "roofing-companies",
    industry: "roofing company",
    plural: "roofing companies",
    metaTitle: "Roofing Website Design That Books Inspections",
    metaDescription:
      "Roofing website design for US contractors: free inspection forms, storm-damage and insurance-claim pages, project galleries and fast mobile pages. See a live demo.",
    h1: "Roofing Website Design",
    intro:
      "Homeowners look for a roofer right after a storm or when they spot a leak, usually on a phone and often comparing several contractors. A roofing website has to show you are local, licensed and trustworthy, and make booking a free inspection the easiest thing on the page.",
    quickAnswer:
      "A roofing website should lead with a free inspection or estimate request, show the service area clearly, have separate pages for roof replacement, repair, storm and hail damage, and insurance claims, display real project photos and reviews, and load fast on mobile with a tap-to-call number on every page.",
    mustHaves: [
      {
        title: "Free inspection as the main action",
        body: "A short form (name, phone, address, what's wrong) and a call button in the header. After a storm, speed of contact wins the job.",
      },
      {
        title: "Storm, hail and insurance-claim pages",
        body: "Homeowners search \"hail damage roof repair\" and \"roof insurance claim help\". Dedicated pages that explain the process capture those searches and the urgency behind them.",
      },
      {
        title: "Service-area pages",
        body: "List the cities and suburbs you cover, with a page for the main ones. That is how a roofer shows up for \"roofer near me\" across a metro.",
      },
      {
        title: "Proof: projects, warranty, licensing",
        body: "Before-and-after photos, the workmanship warranty, licensing and insurance, and reviews. Homeowners are trusting you with their house.",
      },
      {
        title: "Fast on phones, even with photos",
        body: "Galleries are heavy. Images need to be compressed and lazy-loaded so the page still loads quickly on a phone signal on a job site.",
      },
    ],
    mistakes: [
      "No clear service area, so visitors can't tell if you cover them",
      "Galleries that load slowly and push the contact form off the screen",
      "One generic services page instead of repair, replacement and storm pages",
      "No visible warranty or license details",
    ],
    demo: {
      name: "Copperline Roofing & Exteriors",
      url: "https://roofing.sefathossain.com/",
      image: "/images/work/concepts/roofing.jpg",
      blurb: "A Dallas–Fort Worth roofing concept site built around free inspections, storm-damage help and a quote form.",
    },
    service: { name: "WordPress website development", href: "/services/wordpress-website-development" },
    faqs: [
      {
        question: "How much does a roofing website cost?",
        answer: "It depends on the number of service and city pages, galleries and integrations such as financing or CRM forms. See the WordPress website cost guide for typical US ranges; you'll get a fixed quote before work starts.",
      },
      {
        question: "Can you connect the inspection form to my CRM or email?",
        answer: "Yes. Forms can send to email, a CRM or a scheduling tool, with spam protection so you only get real requests.",
      },
      {
        question: "Will the site help me rank in my area?",
        answer: "It gives you the foundations: service and city pages, fast mobile pages and correct local business details. Reviews and a Google Business Profile matter a lot for roofers, too.",
      },
    ],
  },
  {
    slug: "dentists",
    industry: "dental practice",
    plural: "dentists",
    metaTitle: "Dental Website Design for Family & Cosmetic Practices",
    metaDescription:
      "Dental website design for US practices: treatment pages, new-patient info, insurance and booking calls to action, accessible and fast. See a live demo.",
    h1: "Dental Website Design",
    intro:
      "Patients choose a dentist on how calm and trustworthy the practice feels, whether it takes their insurance, and how easy it is to book. A dental website has to answer those three things quickly and feel welcoming, especially to anxious patients and parents.",
    quickAnswer:
      "A dental website needs clear pages for each treatment (cleanings, implants, aligners, cosmetic and children's dentistry), a new-patient page with insurance and first-visit details, an obvious booking or call button, real photos of the team and office, and accessible, fast pages that work well on phones.",
    mustHaves: [
      {
        title: "Treatment pages that answer real questions",
        body: "What the treatment involves, how long it takes, recovery and cost factors. These pages rank for searches like \"dental implants [city]\" and calm nervous patients.",
      },
      {
        title: "New-patient and insurance page",
        body: "Accepted insurance, what to bring, what happens at the first visit and payment options. It is one of the most-visited pages on any practice site.",
      },
      {
        title: "Booking front and center",
        body: "A booking button or online scheduling link in the header, plus click-to-call on mobile. Fewer steps means more appointments.",
      },
      {
        title: "Warm, real visuals",
        body: "Photos of the actual team and office instead of generic smiles. Trust is the whole decision.",
      },
      {
        title: "Accessible and private",
        body: "Readable contrast, keyboard-friendly navigation and alt text help every patient. Contact forms should collect only what is needed and never ask for health details over a plain email form.",
      },
    ],
    mistakes: [
      "Insurance information buried or missing",
      "One \"services\" page instead of a page per treatment",
      "Stock photos that don't show the real practice",
      "Contact forms that collect health details without proper safeguards",
    ],
    demo: {
      name: "Lumen Family Dentistry",
      url: "https://dentist.sefathossain.com/",
      image: "/images/work/concepts/dentist.jpg",
      blurb: "A calm, modern family-dentistry concept site with treatment pages, new-patient info and booking calls to action.",
    },
    service: { name: "WordPress website development", href: "/services/wordpress-website-development" },
    faqs: [
      {
        question: "How much does a dental website cost?",
        answer: "It depends on the number of treatment pages, locations and integrations such as online booking. See the WordPress website cost guide for typical US ranges; you'll get a fixed quote once the scope is clear.",
      },
      {
        question: "Can patients book online through the website?",
        answer: "Yes. The site can link to or embed your practice's scheduling system, and every page can carry a booking button and click-to-call.",
      },
      {
        question: "Is a WordPress dental website secure?",
        answer: "It is when it's built and maintained properly. I keep the plugin set small and vetted, lock down logins, add a firewall, backups and monitoring, and avoid collecting health information through ordinary web forms.",
      },
    ],
  },
  {
    slug: "real-estate-agents",
    industry: "real estate agent",
    plural: "real estate agents",
    metaTitle: "Real Estate Agent Website Design for Buyers & Sellers",
    metaDescription:
      "Real estate agent website design: neighborhood guides, seller valuation and buyer inquiry forms, listings integration and a personal brand that wins clients. See a live demo.",
    h1: "Real Estate Agent Website Design",
    intro:
      "Buyers and sellers pick an agent they trust to know the area. A real estate website has to show that local knowledge, make it easy to ask about a home or a valuation, and present the agent as the person you want on your side.",
    quickAnswer:
      "A real estate agent website should feature neighborhood or area guides, a home valuation form for sellers and an inquiry form for buyers, current listings (linked or integrated from your MLS/IDX provider), testimonials and a strong personal bio, all fast and easy to use on a phone.",
    mustHaves: [
      {
        title: "Neighborhood and area guides",
        body: "Pages about the areas you serve (schools, commute, lifestyle, price ranges) show expertise and rank for searches like \"living in [neighborhood]\" from relocating buyers.",
      },
      {
        title: "Separate paths for buyers and sellers",
        body: "Sellers want a home-value estimate; buyers want listings and a showing. Give each a clear form instead of one generic contact page.",
      },
      {
        title: "Listings that stay current",
        body: "Link to or integrate listings through your MLS/IDX provider so homes update automatically, instead of manually copied posts that go stale.",
      },
      {
        title: "A personal brand",
        body: "Clients hire the agent. A real photo, your story, your track record in your own words and reviews from past clients do more than any template.",
      },
      {
        title: "Fast, image-heavy pages that still load",
        body: "Property photos are large. Optimized images and a fast host keep the site quick on phones, where most buyers browse.",
      },
    ],
    mistakes: [
      "A brokerage template that looks like every other agent's site",
      "No seller valuation form, so seller leads go elsewhere",
      "Stale listings copied by hand",
      "No local area content, so nothing ranks beyond the agent's name",
    ],
    demo: {
      name: "Driftwood & Co. Realty",
      url: "https://realestate.sefathossain.com/",
      image: "/images/work/concepts/realestate.jpg",
      blurb: "A San Diego coastal real-estate concept site for relocating buyers and local sellers, with area guides and listing inquiries.",
    },
    service: { name: "WordPress website development", href: "/services/wordpress-website-development" },
    faqs: [
      {
        question: "How much does a real estate agent website cost?",
        answer: "It depends on area-guide pages, listings integration and custom features. See the WordPress website cost guide for typical US ranges; you'll get a fixed quote before work starts.",
      },
      {
        question: "Can you add MLS/IDX listings to my site?",
        answer: "Yes, through your MLS/IDX provider's integration or plugin, so listings update automatically. The provider's subscription is separate.",
      },
      {
        question: "Can I update my own listings and guides?",
        answer: "Yes. The site is built so you can add area guides, blog posts and testimonials yourself, and I walk you through it at handover.",
      },
    ],
  },
];

export function getIndustryWebsite(slug: string) {
  return INDUSTRY_WEBSITES.find((i) => i.slug === slug);
}
