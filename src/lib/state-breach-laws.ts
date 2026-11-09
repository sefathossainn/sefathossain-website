/**
 * Plain-English summaries of each service-area state's data-breach
 * notification law, shown on the city landing pages. This is genuinely
 * state-specific, useful content for an owner whose hacked site exposed
 * customer data.
 *
 * Every statement here was checked (October 2026) against the linked source.
 * Sources marked "(unofficial copy)" are statute mirrors, used where the
 * official legislature site could not be reached. A field is left out when it
 * could not be confirmed, and the page then skips that row. GA, IL, MA, PA,
 * OH, VA, AZ, NJ, MN, MD and OR were added in November 2026 (checked against
 * the linked sources). TN, MO, MI and NC were researched but left out until
 * possible 2024–2026 amendments can be confirmed on official sites (MI has a
 * 2025 Senate-passed bill adding a 45-day deadline). Re-check entries before
 * relying on them; laws change. Not legal advice.
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
  IL: {
    statute: "815 ILCS 530 (Personal Information Protection Act), notice duties in § 530/10",
    summary:
      "If a breach exposed Illinois residents' personal information, you must notify them free of charge. If more than 500 Illinois residents are affected, the Illinois Attorney General must be notified too.",
    personalInfo:
      "First name or initial and last name with an unencrypted SSN, driver's license or state ID number, financial account or card number (with any required code), medical or health-insurance information, or biometric data. A username or email with a password or security question and answer also counts.",
    residentDeadline:
      "In the most expedient time possible and without unreasonable delay, consistent with measures needed to determine the scope of the breach and restore security. A written law-enforcement request can delay notice.",
    regulatorNotice:
      "If one breach requires notice to more than 500 Illinois residents, notify the Attorney General no later than when you notify consumers, with a description of the breach, the number of Illinois residents affected and the steps taken. The AG takes reports through its online Data Breach Notice System.",
    sources: [
      {
        label: "Illinois Attorney General: data breach (for businesses)",
        href: "https://www.illinoisattorneygeneral.gov/consumer-protection/for-businesses/data-breach",
      },
      {
        label: "815 ILCS 530/10 (unofficial copy)",
        href: "https://codes.findlaw.com/il/chapter-815-business-transactions/il-st-sect-815-530-10/",
      },
    ],
  },
  GA: {
    statute: "O.C.G.A. § 10-1-912 (Georgia Personal Identity Protection Act)",
    summary:
      "Georgia's notification statute is written for \"information brokers\" (businesses that collect personal information for a fee mainly to supply it to third parties) and government data collectors. Check with an attorney whether it covers your business; if it does, affected Georgia residents must be notified promptly.",
    personalInfo:
      "First name or initial and last name with an unencrypted SSN, driver's license or state ID number, account or card number usable without extra information, or account passwords, PINs or access codes. Those data elements also count without a name if they are enough to attempt identity theft.",
    residentDeadline:
      "In the most expedient time possible and without unreasonable delay, consistent with measures needed to determine the scope of the breach and restore the system. A law-enforcement delay is allowed.",
    regulatorNotice:
      "No notice to the Attorney General is required. If more than 10,000 Georgia residents are notified at one time, notify the nationwide consumer reporting agencies without unreasonable delay.",
    extra:
      "A business that keeps data on behalf of an information broker or data collector must tell that broker or collector about a breach within 24 hours of discovering it.",
    sources: [
      {
        label: "O.C.G.A. § 10-1-912 (unofficial copy)",
        href: "https://codes.findlaw.com/ga/title-10-commerce-and-trade/ga-code-sect-10-1-912/",
      },
      {
        label: "O.C.G.A. § 10-1-911 definitions (unofficial copy)",
        href: "https://codes.findlaw.com/ga/title-10-commerce-and-trade/ga-code-sect-10-1-911/",
      },
    ],
  },
  MA: {
    statute: "Mass. Gen. Laws ch. 93H, § 3",
    summary:
      "If you know or have reason to know of a breach of Massachusetts residents' personal information, you must notify the residents, the Attorney General and the Office of Consumer Affairs and Business Regulation. If Social Security numbers were exposed, you must also offer free credit monitoring.",
    personalInfo:
      "First name or initial and last name with an SSN, a driver's license or state ID number, or a financial account or card number that would allow access to the account. Information lawfully obtained from public records is excluded.",
    residentDeadline:
      "As soon as practicable and without unreasonable delay. Notice may not be held back just because the total number of affected residents is not yet known.",
    regulatorNotice:
      "Notify the Attorney General and the Director of Consumer Affairs and Business Regulation under the same standard, with no minimum number of residents. The Director then identifies any consumer reporting agencies or state agencies that must also be told.",
    extra:
      "If Social Security numbers were exposed, offer affected residents at least 18 months of free credit monitoring, without requiring them to waive their right to sue (ch. 93H, § 3A).",
    sources: [
      {
        label: "Mass. Gen. Laws ch. 93H, § 3 (unofficial copy)",
        href: "https://codes.findlaw.com/ma/part-i-administration-of-the-government-ch-1-182/ma-gen-laws-ch-93h-sect-3/",
      },
      {
        label: "Mass. Gen. Laws ch. 93H, § 3A (unofficial copy)",
        href: "https://codes.findlaw.com/ma/part-i-administration-of-the-government-ch-1-182/ma-gen-laws-ch-93h-sect-3a/",
      },
    ],
  },
  PA: {
    statute: "73 P.S. § 2301 et seq. (Breach of Personal Information Notification Act, as amended by Act 33 of 2024)",
    summary:
      "If computerized personal information of Pennsylvania residents was breached, you must notify them without unreasonable delay. Since September 2024, breaches affecting more than 500 residents must also be reported to the Attorney General, and some require free credit monitoring.",
    personalInfo:
      "First name or initial and last name with an unencrypted SSN, driver's license or state ID number, financial account or card number (with any required code), or health-insurance information. A username or email with a password or security question and answer also counts.",
    residentDeadline:
      "Without unreasonable delay after you determine a breach occurred, except as needed to determine its scope and restore the system. A written law-enforcement request can delay notice.",
    regulatorNotice:
      "If more than 500 Pennsylvania residents must be notified, notify the Office of Attorney General at the same time, and notify the nationwide consumer reporting agencies without unreasonable delay.",
    extra:
      "If a name was exposed with an SSN, bank account number, or driver's license or state ID number, you must pay for one independent credit report (where a free one isn't available) and 12 months of credit monitoring.",
    sources: [
      {
        label: "PA General Assembly: 2005 Act 94, consolidated text",
        href: "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?txtType=PDF&SessYr=2005&ActNum=0094.&SessInd=0",
      },
      {
        label: "PA General Assembly: 2024 Act 33",
        href: "https://www.palegis.us/statutes/unconsolidated/law-information?sessYr=2024&sessInd=0&actNum=33",
      },
    ],
  },
  OH: {
    statute: "Ohio Rev. Code § 1349.19",
    summary:
      "If computerized personal information of Ohio residents was breached, you must notify them quickly and no later than 45 days after discovering it. Ohio does not require notice to the Attorney General.",
    personalInfo:
      "First name or initial and last name with an unencrypted SSN, driver's license or state ID number, or an account or card number with any required code or password.",
    residentDeadline:
      "In the most expedient time possible but not later than 45 days after discovering the breach, subject to measures needed to determine its scope and restore the system. A law-enforcement delay is allowed.",
    regulatorNotice:
      "No notice to the Attorney General is required. If one breach involves more than 1,000 Ohio residents, notify the nationwide consumer reporting agencies without unreasonable delay.",
    sources: [
      {
        label: "Ohio Rev. Code § 1349.19 (unofficial copy)",
        href: "https://codes.findlaw.com/oh/title-xiii-commercial-transactions/oh-rev-code-sect-1349-19/",
      },
    ],
  },
  VA: {
    statute: "Va. Code § 18.2-186.6",
    summary:
      "If a breach exposed Virginia residents' personal information and you reasonably believe it has caused or will cause identity theft or fraud, you must notify both the Virginia Attorney General and the affected residents without unreasonable delay.",
    personalInfo:
      "First name or initial and last name with an unencrypted SSN, driver's license or state ID number, financial account or card number (with any required code), passport number or military ID number.",
    residentDeadline:
      "Without unreasonable delay. Notice may be reasonably delayed to determine the scope of the breach and restore the system, or when law enforcement advises that notice would impede an investigation.",
    regulatorNotice:
      "Notify the Office of the Attorney General of every notifiable breach without unreasonable delay; there is no minimum number of residents. If more than 1,000 people are notified at one time, also tell the Attorney General and the nationwide consumer reporting agencies the timing, distribution and content of the notices.",
    sources: [
      {
        label: "Va. Code § 18.2-186.6 (Virginia Legislative Information System)",
        href: "https://law.lis.virginia.gov/vacode/title18.2/chapter6/section18.2-186.6/",
      },
    ],
  },
  AZ: {
    statute: "Ariz. Rev. Stat. §§ 18-551, 18-552",
    summary:
      "If you learn of a security incident, Arizona law requires a prompt investigation. If it turns out to be a breach of Arizona residents' personal information, you have 45 days from that finding to notify the people affected.",
    personalInfo:
      "First name or initial and last name with an SSN, driver's license, passport or taxpayer ID number, a financial account or card number with any required code, health-insurance ID, medical information, or biometric data. A username or email with a password or security question and answer also counts.",
    residentDeadline:
      "Within 45 days after determining that a breach occurred. A law-enforcement delay is allowed; notice is then due within 45 days after law enforcement says it no longer compromises the investigation.",
    regulatorNotice:
      "If more than 1,000 people must be notified, also notify the three largest nationwide consumer reporting agencies, the Attorney General and the director of the Arizona Department of Homeland Security, within the same 45 days.",
    extra:
      "No notice is required if the investigation finds the breach has not resulted in, and is not reasonably likely to result in, substantial economic loss to affected people.",
    sources: [
      {
        label: "A.R.S. § 18-552 (Arizona Legislature)",
        href: "https://www.azleg.gov/ars/18/00552.htm",
      },
      {
        label: "A.R.S. § 18-551 definitions (Arizona Legislature)",
        href: "https://www.azleg.gov/ars/18/00551.htm",
      },
    ],
  },
  NJ: {
    statute: "N.J. Stat. §§ 56:8-161, 56:8-163",
    summary:
      "If a breach exposed New Jersey customers' personal information, you must report it to the New Jersey State Police before you notify the customers, then notify them without unreasonable delay.",
    personalInfo:
      "First name or initial and last name with an SSN, driver's license or state ID number, or an account or card number with any required code or password. A username or email with a password or security question and answer also counts. Encrypted data is not covered.",
    residentDeadline:
      "In the most expedient time possible and without unreasonable delay, consistent with law-enforcement needs and the steps needed to determine the scope of the breach and restore the system.",
    regulatorNotice:
      "Before notifying customers, report the breach to the Division of State Police in the Department of Law and Public Safety; there is no size threshold. If more than 1,000 people are notified at one time, also tell the nationwide consumer reporting agencies without unreasonable delay.",
    extra:
      "No notice is required if you establish that misuse of the information is not reasonably possible. That decision must be documented in writing and kept for 5 years.",
    sources: [
      {
        label: "N.J. Stat. § 56:8-163 (unofficial copy)",
        href: "https://codes.findlaw.com/nj/title-56-trade-names-trademarks-and-unfair-trade-practices/nj-st-sect-56-8-163.html",
      },
    ],
  },
  MN: {
    statute: "Minn. Stat. § 325E.61",
    summary:
      "If a breach exposes Minnesota residents' unencrypted personal information, you must notify them as quickly as possible, with no fixed day count. If you notify more than 500 people at once, you must also tell the nationwide consumer reporting agencies within 48 hours.",
    personalInfo:
      "First name or initial and last name combined with a Social Security number, a driver's license or Minnesota ID number, or a financial account, credit or debit card number with any required code or password. Encrypted data is excluded unless the key was also acquired.",
    residentDeadline:
      "In the most expedient time possible and without unreasonable delay. Notice may be delayed to a date certain if a law enforcement agency determines that notice would impede a criminal investigation.",
    regulatorNotice:
      "The statute does not require notice to the Attorney General. If more than 500 people are notified at one time, notify the nationwide consumer reporting agencies within 48 hours of the timing, distribution and content of the notices.",
    sources: [
      {
        label: "Minn. Stat. § 325E.61 (Minnesota Revisor of Statutes)",
        href: "https://www.revisor.mn.gov/statutes/cite/325E.61",
      },
    ],
  },
  MD: {
    statute: "Md. Code, Commercial Law § 14-3504",
    summary:
      "If a breach of your systems makes misuse of Maryland residents' personal information likely, you must notify them within 45 days of discovering it, and you must tell the Maryland Attorney General before you notify them.",
    personalInfo:
      "Name combined with a Social Security, taxpayer ID, passport or other federal ID number, a driver's license or state ID number, a financial or card account number with any required code, health or health-insurance information, biometric or genetic data. A username or email with a password or security answer that opens an email account also counts.",
    residentDeadline:
      "Not later than 45 days after the business discovers or is notified of the breach, following a prompt, good-faith investigation. A delay is allowed if law enforcement says notice would impede a criminal investigation, or to determine the scope of the breach and restore the system.",
    regulatorNotice:
      "Notify the Maryland Attorney General before notifying individuals. There is no minimum number of affected residents for this.",
    extra:
      "If you decide the breach does not create a likelihood of misuse and do not notify, keep records of that decision for 3 years.",
    sources: [
      {
        label: "Md. Code, Com. Law § 14-3504 (Maryland General Assembly)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gcl&section=14-3504&enactments=false",
      },
    ],
  },
  OR: {
    statute: "Or. Rev. Stat. § 646A.604",
    summary:
      "If a breach exposes Oregon consumers' personal information, including online account logins, you must notify them within 45 days. If more than 250 Oregonians are affected, the Oregon Attorney General must be notified too.",
    personalInfo:
      "Name combined with a Social Security, driver's license, state ID or passport number, a financial or card account number with any required code, biometric data, health-insurance ID or medical information. A username or account identifier with the means to log in also counts.",
    residentDeadline:
      "In the most expeditious manner possible, without unreasonable delay, but not later than 45 days after discovering the breach. A delay is allowed only if law enforcement determines notice would impede a criminal investigation and asks in writing.",
    regulatorNotice:
      "If more than 250 consumers must be notified, notify the Attorney General as well; the Oregon DOJ asks for a sample of the notice through its online form. If more than 1,000 consumers are affected, notify the consumer reporting agencies without unreasonable delay.",
    sources: [
      {
        label: "Oregon DOJ: data breaches",
        href: "https://www.doj.state.or.us/consumer-protection/id-theft-data-breaches/data-breaches/",
      },
      {
        label: "ORS 646A.604 (unofficial copy)",
        href: "https://oregon.public.law/statutes/ors_646A.604",
      },
    ],
  },
};

export function getStateBreachLaw(stateAbbr: string): StateBreachLaw | undefined {
  return laws[stateAbbr];
}

/** When the entries above were last checked against their sources. */
export const BREACH_LAWS_CHECKED = "November 2026";

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};

/** Every verified state, alphabetical by state name, for the hub page. */
export function listStateBreachLaws() {
  return Object.entries(laws)
    .map(([abbr, law]) => ({
      abbr,
      name: STATE_NAMES[abbr] ?? abbr,
      slug: (STATE_NAMES[abbr] ?? abbr).toLowerCase().replace(/\s+/g, "-"),
      law,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
