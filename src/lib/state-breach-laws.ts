/**
 * Plain-English summaries of each service-area state's data-breach
 * notification law, shown on the city landing pages. This is genuinely
 * state-specific, useful content for an owner whose hacked site exposed
 * customer data.
 *
 * Every statement here was checked (October 2026) against the linked source.
 * Sources marked "(unofficial copy)" are statute mirrors, used where the
 * official legislature site could not be reached. A field is left out when it
 * could not be confirmed, and the page then skips that row. States whose
 * law could not be verified well enough (GA, IL, MA in Oct 2026) are left out,
 * so those city pages show no law section. Re-check these
 * before relying on them; laws change. Not legal advice.
 */

export type StateBreachLaw = {
  statute: string;
  /** One or two sentences, framed for a hacked-site owner. */
  summary: string;
  personalInfo?: string;
  residentDeadline: string;
  regulatorNotice?: string;
  extra?: string;
  sources: { label: string; href: string }[];
};

const laws: Record<string, StateBreachLaw> = {
  NY: {
    statute: "N.Y. General Business Law § 899-aa (part of the SHIELD Act)",
    summary:
      "If a hack exposed New York residents' personal information, New York law sets a hard deadline for telling them, and requires notice to several state offices.",
    personalInfo:
      "Name plus items like a Social Security, driver's license or account number, biometric data, or medical or health-insurance information. A username or email together with its password also counts, even without a name.",
    residentDeadline:
      "In the most expedient time possible and without unreasonable delay, and within 30 days after the breach is discovered (a law-enforcement delay is allowed).",
    regulatorNotice:
      "If any New York resident is notified, the Attorney General, the Department of State and the State Police must be told as well (plus DFS for businesses it regulates). If more than 5,000 residents are notified, consumer reporting agencies must be told too.",
    sources: [
      {
        label: "NY Gen. Bus. Law § 899-aa (NY Senate)",
        href: "https://www.nysenate.gov/legislation/laws/GBS/899-AA",
      },
    ],
  },
  CA: {
    statute: "California Civil Code § 1798.82",
    summary:
      "Since January 1, 2026, California gives businesses a fixed 30-day window to notify residents after a breach, and a sample of the notice must go to the Attorney General for larger breaches.",
    personalInfo:
      "Name plus items like a Social Security, driver's license or financial account number, medical or health-insurance information, or biometric or genetic data. A username or email together with its password also counts.",
    residentDeadline:
      "Within 30 calendar days of discovering the breach, with limited delay allowed for law enforcement or to determine the scope of the breach and restore the system.",
    regulatorNotice:
      "If more than 500 California residents are notified, send a sample copy of the notice to the Attorney General electronically, within 15 calendar days of notifying consumers.",
    extra:
      "Under the CCPA, consumers can also sue a business when unencrypted, unredacted personal information is breached because the business did not keep reasonable security.",
    sources: [
      {
        label: "CA Attorney General: data breach reporting",
        href: "https://oag.ca.gov/privacy/databreach/reporting",
      },
      {
        label: "CA Attorney General: CCPA",
        href: "https://oag.ca.gov/privacy/ccpa",
      },
      {
        label: "Civil Code § 1798.82 (unofficial copy)",
        href: "https://california.public.law/codes/ca_civ_code_section_1798.82",
      },
    ],
  },
  TX: {
    statute:
      "Texas Identity Theft Enforcement and Protection Act, Tex. Bus. & Com. Code § 521.053",
    summary:
      "Texas sets two clocks after a breach: one for telling affected people and a shorter one for reporting larger breaches to the Attorney General.",
    personalInfo:
      "\"Sensitive personal information\": name plus a Social Security number, driver's license or government ID number, or a financial account or card number with its access code, as well as health information.",
    residentDeadline:
      "Without unreasonable delay, and no later than 60 days after determining that the breach occurred.",
    regulatorNotice:
      "If 250 or more Texans are affected, notify the Attorney General as soon as practicable and no later than 30 days after, using the AG's online form.",
    sources: [
      {
        label: "Texas Attorney General: data breach reporting",
        href: "https://www.texasattorneygeneral.gov/consumer-protection/data-breach-reporting",
      },
      {
        label: "Bus. & Com. Code § 521.053 (unofficial copy)",
        href: "https://texas.public.law/statutes/tex._bus._and_com._code_section_521.053",
      },
    ],
  },
  FL: {
    statute: "Florida Information Protection Act, Fla. Stat. § 501.171",
    summary:
      "Florida gives businesses 30 days to notify residents after a breach, requires a report to the state for larger breaches, and expects reasonable measures to protect the data in the first place.",
    personalInfo:
      "Name plus items like a Social Security, ID or financial account number, medical or health-insurance information, or biometric data. A username or email together with its password also counts.",
    residentDeadline:
      "As expeditiously as practicable and without unreasonable delay, and no later than 30 days after determining a breach occurred (15 more days can be granted for good cause).",
    regulatorNotice:
      "If 500 or more Floridians are affected, notify the Department of Legal Affairs (the Attorney General's office) within 30 days.",
    sources: [
      {
        label: "Fla. Stat. § 501.171 (unofficial copy)",
        href: "https://florida.public.law/statutes/fla._stat._501.171",
      },
    ],
  },
  WA: {
    statute: "RCW 19.255.010 (definitions in RCW 19.255.005)",
    summary:
      "Washington gives businesses 30 days to notify residents after a breach is discovered, and larger breaches must also be reported to the Attorney General.",
    personalInfo:
      "Name plus items like a Social Security, driver's license or account number, full date of birth, health-insurance or medical information, or biometric data. A username or email together with its password also counts.",
    residentDeadline:
      "In the most expedient time possible, without unreasonable delay, and no more than 30 calendar days after the breach was discovered.",
    regulatorNotice:
      "If more than 500 Washington residents are affected by one breach, notify the Attorney General within 30 days of discovery, including a sample of the notice.",
    sources: [
      {
        label: "RCW 19.255.010 (WA Legislature)",
        href: "https://app.leg.wa.gov/RCW/default.aspx?cite=19.255.010",
      },
      {
        label: "RCW 19.255.005",
        href: "https://app.leg.wa.gov/RCW/default.aspx?cite=19.255.005",
      },
    ],
  },
  CO: {
    statute: "Colorado Revised Statutes § 6-1-716",
    summary:
      "Colorado gives businesses 30 days from determining a breach occurred to notify residents, and requires reasonable security procedures and a written policy for disposing of personal data.",
    personalInfo:
      "Name plus items like a Social Security, driver's license or passport number, medical or health-insurance information, or biometric data. A username or email together with its password also counts.",
    residentDeadline:
      "In the most expedient time possible, without unreasonable delay, and within 30 days after determining that a breach occurred.",
    regulatorNotice:
      "If 500 or more Coloradans are affected, notify the Attorney General within 30 days using the online form. Above 1,000 residents, consumer reporting agencies must be notified too.",
    extra:
      "If login credentials were exposed, the notice must tell residents to change their passwords.",
    sources: [
      {
        label: "Colorado Attorney General: data protection",
        href: "https://coag.gov/resources/data-protection/",
      },
      {
        label: "Colorado data protection laws",
        href: "https://coag.gov/resources/data-protection-laws/",
      },
    ],
  },
};

export function getStateBreachLaw(stateAbbr: string): StateBreachLaw | undefined {
  return laws[stateAbbr];
}
