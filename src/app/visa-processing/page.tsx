// src/app/visa-processing/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";
// import { Footer } from "@/components/home/layout/Footer";

type VisaCategoryKey = "student" | "visit";

type StudentCountryKey = "uk" | "australia" | "usa";
type VisitCountryKey =
  | "uae"
  | "saudi"
  | "qatar"
  | "kuwait"
  | "bahrain"
  | "oman"
  | "turkey"
  | "malaysia"
  | "singapore"
  | "thailand";

type CountryBase<K extends string> = {
  key: K;
  name: string;
  flagEmoji: string;
  badge?: string;
  sectionId?: string; // reserved for future anchors/CMS
};

type StudentCountry = CountryBase<StudentCountryKey>;
type VisitCountry = CountryBase<VisitCountryKey>;

const studentCountries: StudentCountry[] = [
  {
    key: "uk",
    name: "United Kingdom",
    flagEmoji: "🇬🇧",
    sectionId: "uk",
    badge: "UKVI",
  },
  {
    key: "australia",
    name: "Australia",
    flagEmoji: "🇦🇺",
    sectionId: "australia",
    badge: "Subclass 500",
  },
  {
    key: "usa",
    name: "United States",
    flagEmoji: "🇺🇸",
    sectionId: "usa",
    badge: "F-1 / SEVIS",
  },
];

const visitCountries: VisitCountry[] = [
  {
    key: "uae",
    name: "United Arab Emirates",
    flagEmoji: "🇦🇪",
    sectionId: "uae",
    badge: "e-Visa",
  },
  {
    key: "saudi",
    name: "Saudi Arabia",
    flagEmoji: "🇸🇦",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "qatar",
    name: "Qatar",
    flagEmoji: "🇶🇦",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "kuwait",
    name: "Kuwait",
    flagEmoji: "🇰🇼",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "bahrain",
    name: "Bahrain",
    flagEmoji: "🇧🇭",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "oman",
    name: "Oman",
    flagEmoji: "🇴🇲",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "turkey",
    name: "Turkey",
    flagEmoji: "🇹🇷",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "malaysia",
    name: "Malaysia",
    flagEmoji: "🇲🇾",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "singapore",
    name: "Singapore",
    flagEmoji: "🇸🇬",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
  {
    key: "thailand",
    name: "Thailand",
    flagEmoji: "🇹🇭",
    sectionId: "visit-dynamic",
    badge: "Visit",
  },
];

const studentFutureFlags = [
  "UK",
  "Australia",
  "Canada",
  "New Zealand",
  "USA",
  "Denmark",
  "Netherlands",
  "Sweden",
  "Finland",
  "Norway",
  "Switzerland",
  "Austria",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Malta",
  "Hungary",
  "Cyprus",
  "Ireland",
  "Malaysia",
  "Singapore",
  "Thailand",
  "China",
  "Japan",
  "South Korea",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Turkey",
];

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={themeVars} className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="pt-24 pb-14 sm:pt-28 sm:pb-16">{children}</div>
      {/* <Footer /> */}
    </main>
  );
}

/** refined card look: slightly softer border + subtle shadow + optional top hairline */
function Card({
  children,
  className = "",
  hairline = false,
}: {
  children: React.ReactNode;
  className?: string;
  hairline?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-slate-200/70 bg-white",
        "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
        className,
      ].join(" ")}
    >
      {hairline ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--evg-gold)]/35 to-transparent"
        />
      ) : null}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-slate-200/70" />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--evg-deep)]">
            {title}
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>
        {subtitle ? (
          <p className="mt-3 text-sm sm:text-base text-slate-600">{subtitle}</p>
        ) : null}
      </div>

      <Card hairline className="p-5 sm:p-7">
        {children}
      </Card>
    </section>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 text-base sm:text-lg font-semibold text-[var(--evg-deep)] flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.14)]" />
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-sm sm:text-base text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--evg-blue)]/70" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyValueGrid({
  rows,
}: {
  rows: Array<{ k: string; v: React.ReactNode }>;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className={[
            "rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4",
            "shadow-[0_10px_28px_rgba(2,6,23,0.05)]",
          ].join(" ")}
        >
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {r.k}
          </div>
          <div className="mt-1 text-sm sm:text-base text-slate-800 leading-relaxed">
            {r.v}
          </div>
        </div>
      ))}
    </div>
  );
}

/** DRY flags picker for both student + visit */
function FlagsPicker<K extends string>({
  title,
  items,
  selected,
  onSelect,
  layout = "wrap",
  showBadges = true,
}: {
  title: string;
  items: Array<CountryBase<K>>;
  selected: K;
  onSelect: (k: K) => void;
  layout?: "wrap" | "grid";
  showBadges?: boolean;
}) {
  const listClass =
    layout === "grid"
      ? "mt-1 grid grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-4 lg:grid-cols-5"
      : "flex flex-wrap gap-2";

  return (
    <Card hairline className="p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-medium text-[var(--evg-deep)]">
          {title}
        </div>

        <div className={listClass}>
          {items.map((c) => {
            const isActive = c.key === selected;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onSelect(c.key)}
                className={[
                  "group inline-flex items-center gap-2 rounded-full",
                  "border bg-white px-3 py-2 text-sm",
                  "shadow-sm transition",
                  layout === "grid" ? "justify-start" : "",
                  isActive
                    ? "border-[var(--evg-gold)]/70 bg-[rgba(214,162,58,0.08)] text-[var(--evg-deep)]"
                    : "border-slate-200 text-slate-700 hover:-translate-y-0.5 hover:border-[var(--evg-gold)]/70 hover:shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--evg-gold)]/25",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <span className="text-base transition-transform duration-300 group-hover:scale-[1.08]">
                  {c.flagEmoji}
                </span>
                <span className="truncate underline-offset-4 group-hover:underline group-hover:decoration-[var(--evg-gold)]">
                  {c.name}
                </span>

                {showBadges && c.badge ? (
                  <span className="ml-1 hidden sm:inline-flex">
                    <Badge>{c.badge}</Badge>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function Dropdown({
  value,
  onChange,
}: {
  value: VisaCategoryKey;
  onChange: (v: VisaCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">


      <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
            Visa Processing
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
          Compliance-focused guidance for students, tourists, families, and
          business travelers—structured, transparent, and visa-ready.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="mt-2 relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as VisaCategoryKey)}
            className={[
              "w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm sm:text-base text-slate-800",
              "shadow-sm outline-none transition",
              "focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20",
            ].join(" ")}
          >
            <option value="student">Student Visa Processing</option>
            <option value="visit">
              Visit, Family & Business Visa Processing
            </option>
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

function AccentCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.12)]" />
        <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function VisitTemplate({ countryName }: { countryName: string }) {
  // Uses UAE copy as placeholder for ALL visit countries for now
  return (
    <Section
      id="visit-dynamic"
      title={`${countryName} (Visit, Family & Business)`}
      subtitle="For now, this uses the UAE reference layout. We will replace each country with accurate requirements later."
    >
      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
        Visas are generally short-term, sponsor-based, and processed
        electronically, making accuracy of documents and sponsor details
        critical. Elite Visa Global provides end-to-end assistance to ensure
        correct visa type selection and compliant submission.
      </p>

      <Subheading>Tourist / Visit Visa</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Leisure travel, sightseeing, short-term personal visits (without family sponsorship).",
          },
          {
            k: "Common Visa Validity",
            v: "30 days (single or multiple entry), 60 days (single or multiple entry). Extendable in some cases (subject to rules).",
          },
          {
            k: "Required Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (minimum 6 months validity)",
                  "Passport-size photograph (white background)",
                  "National ID (NID) copy",
                  "Travel history (if available)",
                  "Hotel booking or address in destination",
                  "Return or onward ticket (recommended)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Approx Fee (BD)",
            v: "30-day: BDT 10,000 – 15,000; 60-day: BDT 15,000 – 20,000 (varies based on sponsor and processing)",
          },
          { k: "Approximate Processing Time", v: "3–10 working days" },
        ]}
      />

      <Subheading>Family Visit Visa</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Visiting close family members legally residing in the destination country.",
          },
          {
            k: "Sponsor",
            v: "Resident sponsor (spouse/parent/child/close relative) with valid status.",
          },
          {
            k: "Applicant Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (6 months validity)",
                  "Photograph (white background)",
                  "National ID copy",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Sponsor Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Residence status/visa copy",
                  "National ID (if applicable)",
                  "Passport copy",
                  "Salary proof / contract",
                  "Tenancy proof",
                  "Proof of relationship (attested if required)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Approx Fee (BD)",
            v: "30-day: BDT 12,000 – 18,000; 60-day: BDT 18,000 – 25,000",
          },
          { k: "Approximate Processing Time", v: "5–10 working days" },
        ]}
      />

      <Subheading>Business Visa</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Business meetings, exhibitions, conferences, short-term commercial visits (not valid for employment).",
          },
          {
            k: "Sponsor",
            v: "Company sponsor / event organizer / registered entity.",
          },
          {
            k: "Applicant Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (6 months validity)",
                  "Photograph (white background)",
                  "National ID copy",
                  "Previous travel history (if available)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Business Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Invitation letter",
                  "Sponsor trade license / business registration",
                  "Cover letter stating purpose of visit",
                  "Meeting or event details",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Approx Fee (BD)",
            v: "30-day: BDT 15,000 – 22,000; 60-day: BDT 20,000 – 30,000",
          },
          { k: "Approximate Processing Time", v: "5–10 working days" },
        ]}
      />

      <Subheading>Important Notes</Subheading>
      <BulletList
        items={[
          "Visa rules can change without notice; always confirm latest requirements before travel.",
          "Overstaying can result in fines and future travel restrictions.",
          "Employment is strictly prohibited on visit or business visas.",
          "Elite Visa Global ensures your application is correctly categorized, accurately documented, and submitted through authorized channels.",
        ]}
      />

      <div className="mt-6">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
        >
          Get Consultation
        </Link>
      </div>
    </Section>
  );
}

export default function VisaProcessingPage() {
  const [category, setCategory] = React.useState<VisaCategoryKey>("student");

  return (
    <PageShell>
      <Container>
        <Card hairline className="p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
          />
          <div className="relative">
            <Dropdown value={category} onChange={setCategory} />
          </div>
        </Card>

        <Divider />

        {category === "student" ? (
          <StudentVisaProcessing />
        ) : (
          <VisitFamilyBusinessVisaProcessing />
        )}

        <Divider />

        <div className="text-sm text-slate-600 leading-relaxed">
          For future CMS: store each country as structured blocks (title,
          bullets, kv, notes) and render via map.
        </div>
      </Container>
    </PageShell>
  );
}

/* =========================
   STUDENT (default country shown)
========================= */

function StudentVisaProcessing() {
  const [selected, setSelected] = React.useState<StudentCountryKey>("uk");

  const studentContent: Record<StudentCountryKey, React.ReactNode> = {
    uk: <UkStudent />,
    australia: <AustraliaStudent />,
    usa: <UsaStudent />,
  };

  return (
    <div className="space-y-10">
      <FlagsPicker
        title="Student visa destinations"
        items={studentCountries}
        selected={selected}
        onSelect={setSelected}
        layout="wrap"
        showBadges
      />

      {studentContent[selected]}
    </div>
  );
}

/* =========================
   VISIT/FAMILY/BUSINESS (default UAE shown)
========================= */

function VisitFamilyBusinessVisaProcessing() {
  const [selected, setSelected] = React.useState<VisitCountryKey>("uae");
  const current = visitCountries.find((c) => c.key === selected);

  return (
    <div className="space-y-10">
      <FlagsPicker
        title="Visit, family & business destinations"
        items={visitCountries}
        selected={selected}
        onSelect={setSelected}
        layout="grid"
        showBadges={false}
      />

      {selected === "uae" ? (
        <UaeVisit />
      ) : (
        <VisitTemplate countryName={current?.name ?? "Selected Country"} />
      )}

      <Section
        title="Other visa destinations (planned)"
        subtitle="Follow Obokash.com list (will be used to build the rest later, including Bangla version)."
      >
        <div className="text-sm text-slate-700">
          Reference list:
          <div className="mt-2">
            <Link
              href="https://www.obokash.com/visa-processing-agent-bangladesh"
              target="_blank"
              className="text-[var(--evg-deep)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:opacity-80"
            >
              obokash.com/visa-processing-agent-bangladesh
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* =========================
   UK (Student)
========================= */

function UkStudent() {
  return (
    <Section
      id="uk"
      title="United Kingdom (UK)"
      subtitle="End-to-end, compliance-focused support to ensure your UK study pathway is academically sound and visa-ready."
    >
      <Subheading>Why Study in the United Kingdom</Subheading>
      <BulletList
        items={[
          "Globally ranked universities and internationally recognised degrees",
          "Strong academic regulation and quality assurance",
          "Multicultural environment with extensive student support services",
          "Access to the Graduate Route (Post-Study Work), subject to UK immigration rules",
        ]}
      />

      <Subheading>Possible Intakes</Subheading>
      <BulletList
        items={[
          "September / October – Main intake (maximum course availability)",
          "January – Secondary intake (limited options)",
          "May – Very limited intake (specific institutions/programs only)",
        ]}
      />

      <Subheading>Possible Courses for Bangladeshi Students</Subheading>
      <BulletList
        items={[
          "Foundation Programs",
          "International Year One / Pathway Programs",
          "Bachelor’s Degrees",
          "Master’s (Taught) Programs",
          "Master’s (Research) Programs",
          "PhD / Doctoral Programs",
          "Career-focused and professional qualifications",
          "Academic progression and subject relevance are key factors in eligibility.",
        ]}
      />

      <Subheading>Spouse & Dependent Policy</Subheading>
      <BulletList
        items={[
          "Under current UK rules, dependents are not permitted for most taught Master’s programs.",
          "Spouse/dependents may be allowed for: PhD / Doctoral programs, Research-based Master’s programs, certain government-funded or sponsored courses.",
          "Eligibility is strictly assessed according to UKVI regulations at the time of application.",
        ]}
      />

      <Subheading>Accepted Language Proof & Minimum Scores</Subheading>
      <BulletList
        items={[
          "IELTS UKVI Academic: typically 6.0 – 6.5 overall; minimum individual bands usually 5.5 – 6.0",
          "IELTS Academic (for admission; UKVI version required for visa)",
          "Medium of Instruction (MOI) – accepted by some institutions, but may not replace IELTS UKVI for visa purposes",
          "Language requirements vary by institution and course level.",
        ]}
      />

      <Subheading>Approximate Tuition Fee Range (per year)</Subheading>
      <KeyValueGrid
        rows={[
          { k: "Foundation / Pathway Programs", v: "GBP 10,000 – 15,000" },
          { k: "Bachelor’s Degrees", v: "GBP 12,000 – 18,000" },
          { k: "Master’s (Taught)", v: "GBP 12,000 – 22,000" },
          { k: "MBA / Specialized Programs", v: "GBP 18,000 – 30,000+" },
          {
            k: "PhD / Research Programs",
            v: "Often funded or partially funded (subject to availability)",
          },
        ]}
      />

      <Subheading>Scholarship Opportunities</Subheading>
      <BulletList
        items={[
          "Merit-based scholarships",
          "Academic excellence awards",
          "Institutional tuition discounts",
          "Partial scholarships (typically GBP 1,000 – 5,000)",
          "Research funding or fee waivers for PhD programs",
          "Scholarships are not guaranteed and depend on academic performance, institution policy, and timely application.",
        ]}
      />

      <Subheading>Documents Checklist – UK Student Visa</Subheading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Mandatory Documents
          </div>
          <BulletList
            items={[
              "Valid passport",
              "Academic certificates & transcripts",
              "IELTS UKVI or accepted English proof",
              "CAS (Confirmation of Acceptance for Studies)",
              "Statement of Purpose / Study Plan",
              "Financial documents (tuition + living cost evidence)",
            ]}
          />
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Additional Documents (if applicable)
          </div>
          <BulletList
            items={[
              "Sponsor documents",
              "Relationship proof (if funded by parents/spouse)",
              "TB test certificate (mandatory for Bangladesh)",
              "Previous refusal documents (if any)",
            ]}
          />
        </div>
      </div>

      <Subheading>UK Student Visa Application Fee (from Bangladesh)</Subheading>
      <BulletList
        items={[
          "UK Student Visa application fee: GBP 490",
          "Immigration Health Surcharge (IHS): GBP 776 per year of study",
          "VFS service charges (if applicable)",
          "Fees are set by UK authorities and may change without prior notice.",
        ]}
      />

      <Subheading>Approximate Visa Processing Time</Subheading>
      <BulletList
        items={[
          "Standard processing: 3–6 weeks",
          "Priority service: may be available during selected periods",
          "Processing time may vary depending on intake season, document verification, and individual case profile.",
        ]}
      />

      <Subheading>Important Advisory</Subheading>
      <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
        UK student visas are assessed based on genuine student intent, academic
        progression, financial credibility, and strict documentation compliance.
        Elite Visa Global conducts pre-application assessments to ensure your
        profile aligns with current UK immigration requirements before
        submission.
      </p>

      <AccentCallout>
        Follow your dreams—with the right guidance. Elite Visa Global supports
        your UK study journey with precision, transparency, and responsibility.
      </AccentCallout>
    </Section>
  );
}

/* =========================
   Australia (Student)
========================= */

function AustraliaStudent() {
  return (
    <Section
      id="australia"
      title="Australia"
      subtitle="Structured, compliance-driven support to help students select the right course, institution, and visa strategy under Australia’s regulated migration framework."
    >
      <Subheading>Why Study in Australia</Subheading>
      <BulletList
        items={[
          "Globally recognised universities and vocational institutions",
          "Strong focus on practical, career-oriented education",
          "Multicultural and student-friendly environment",
          "Opportunity for post-study work (Temporary Graduate visa), subject to current rules",
          "High standard of living with extensive international student support",
        ]}
      />

      <Subheading>Possible Intakes</Subheading>
      <BulletList
        items={[
          "February – Main intake",
          "July – Second major intake",
          "November – Limited intake (institution and course dependent)",
          "Some vocational and private institutions may offer multiple intakes throughout the year.",
        ]}
      />

      <Subheading>Possible Courses for Bangladeshi Students</Subheading>
      <BulletList
        items={[
          "Certificate III & IV programs",
          "Diploma & Advanced Diploma",
          "Bachelor’s Degrees",
          "Graduate Certificate & Graduate Diploma",
          "Master’s Degrees (Coursework & Research)",
          "PhD / Doctoral Programs",
          "Course selection must demonstrate logical academic progression and genuine study intent.",
        ]}
      />

      <Subheading>Spouse & Dependent Policy</Subheading>
      <BulletList
        items={[
          "Australia allows spouse and dependent children for most student visa holders.",
          "Spouse may be eligible for work rights (hours depend on program level).",
          "Higher degree students (Master’s by research / PhD) generally receive full-time work rights for dependents.",
          "Dependent eligibility is assessed under current Department of Home Affairs regulations.",
        ]}
      />

      <Subheading>Accepted Language Proof & Minimum Scores</Subheading>
      <BulletList
        items={[
          "IELTS Academic: typically 6.0 – 6.5 overall; minimum individual bands usually 5.5 – 6.0",
          "PTE Academic",
          "TOEFL iBT",
          "Duolingo English Test (accepted by selected institutions)",
          "Medium of Instruction (MOI) – accepted by some institutions (institution-specific)",
          "English requirements vary by institution, course level, and visa risk assessment.",
        ]}
      />

      <Subheading>Approximate Tuition Fee Range (per year)</Subheading>
      <KeyValueGrid
        rows={[
          { k: "Certificate / Diploma Programs", v: "AUD 8,000 – 15,000" },
          { k: "Bachelor’s Degrees", v: "AUD 15,000 – 25,000" },
          { k: "Master’s Degrees", v: "AUD 18,000 – 35,000" },
          { k: "MBA / Specialized Programs", v: "AUD 30,000 – 45,000+" },
          {
            k: "PhD / Research Programs",
            v: "Often funded or partially funded (subject to availability)",
          },
        ]}
      />

      <Subheading>Scholarship Opportunities</Subheading>
      <BulletList
        items={[
          "Institutional merit-based scholarships",
          "Tuition fee discounts (10%–30%)",
          "Government-funded programs (highly competitive)",
          "Research scholarships for PhD and research Master’s programs",
          "Scholarships are not guaranteed and depend on academic performance, institution policy, and early application.",
        ]}
      />

      <Subheading>Documents Checklist – Australia Student Visa</Subheading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Mandatory Documents
          </div>
          <BulletList
            items={[
              "Valid passport",
              "Academic certificates & transcripts",
              "English language test results",
              "COE (Confirmation of Enrolment)",
              "Genuine Student (GS) statement",
              "Financial documents (tuition + living cost evidence)",
              "OSHC (Overseas Student Health Cover)",
            ]}
          />
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Additional Documents (if applicable)
          </div>
          <BulletList
            items={[
              "Sponsor documents",
              "Relationship documents (for dependents)",
              "Work experience documents (if required)",
              "Previous visa refusal history (if any)",
            ]}
          />
        </div>
      </div>

      <Subheading>
        Australia Student Visa Application Fee (from Bangladesh)
      </Subheading>
      <BulletList
        items={[
          "Student Visa (Subclass 500) application fee: AUD 2000",
          "Biometrics fee (if applicable)",
          "OSHC cost (varies by provider and duration)",
          "Fees are determined by the Australian Government and may change.",
        ]}
      />

      <Subheading>Approximate Visa Processing Time</Subheading>
      <BulletList
        items={[
          "Standard processing: 4–8 weeks",
          "May vary based on: intake season, institution risk level, completeness of documents, individual applicant profile.",
        ]}
      />

      <Subheading>Important Advisory</Subheading>
      <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
        Australian student visas are assessed based on genuine student intent,
        financial capacity, academic progression, and strict compliance with
        visa conditions. Elite Visa Global conducts pre-lodgement assessments to
        reduce risk and ensure alignment with current Australian immigration
        policy.
      </p>

      <AccentCallout>
        Follow your dreams—with informed choices. Elite Visa Global supports
        your Australian study journey with professionalism, clarity, and care.
      </AccentCallout>
    </Section>
  );
}

/* =========================
   USA (Student)
========================= */

function UsaStudent() {
  return (
    <Section
      id="usa"
      title="United States of America (USA)"
      subtitle="Structured guidance to help Bangladeshi students navigate the interview-focused and credibility-driven US student visa process."
    >
      <Subheading>Why Study in the USA</Subheading>
      <BulletList
        items={[
          "Home to many of the world’s top-ranked universities and colleges",
          "Wide range of academic disciplines and flexible study pathways",
          "Strong emphasis on research, innovation, and practical learning",
          "Opportunity for on-campus work and Optional Practical Training (OPT)",
          "Global career recognition and alumni networks",
          "Transparent but strictly assessed visa process",
        ]}
      />

      <Subheading>Possible Intakes</Subheading>
      <BulletList
        items={[
          "Fall (August / September) – Main intake",
          "Spring (January) – Secondary intake",
          "Summer (May / June) – Limited intake (course-dependent)",
        ]}
      />

      <Subheading>Possible Courses for Bangladeshi Students</Subheading>
      <BulletList
        items={[
          "Associate Degrees",
          "Bachelor’s Degrees",
          "Master’s Degrees",
          "MBA & Specialized Graduate Programs",
          "PhD / Doctoral Programs",
          "Research-based programs",
          "Program selection must demonstrate academic relevance, career clarity, and logical progression.",
        ]}
      />

      <Subheading>Spouse & Dependent Policy</Subheading>
      <BulletList
        items={[
          "Spouse and dependents are allowed under F-2 visa status",
          "No work rights for F-2 dependents",
          "Dependents may study part-time (conditions apply)",
        ]}
      />

      <Subheading>Accepted Language Proof & Test Requirements</Subheading>
      <BulletList
        items={[
          "IELTS Academic (typically 6.5 – 7.0)",
          "TOEFL iBT (commonly 80 – 100+)",
          "Duolingo English Test (accepted by many institutions)",
          "SAT / ACT – Undergraduate (where required)",
          "GRE / GMAT – Graduate programs (program-specific)",
          "Medium of Instruction (MOI) is rarely accepted.",
        ]}
      />

      <Subheading>Approximate Tuition Fee Range (per year)</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Community Colleges / Associate Degrees",
            v: "USD 8,000 – 15,000",
          },
          {
            k: "Public Universities (Undergraduate)",
            v: "USD 15,000 – 25,000",
          },
          { k: "Private Universities", v: "USD 25,000 – 45,000+" },
          { k: "Master’s Programs", v: "USD 18,000 – 35,000" },
          { k: "MBA / Specialized Programs", v: "USD 30,000 – 60,000+" },
          {
            k: "PhD / Research Programs",
            v: "Often fully or partially funded",
          },
        ]}
      />

      <Subheading>Scholarship Opportunities</Subheading>
      <BulletList
        items={[
          "Merit-based scholarships",
          "Need-based financial aid (limited for internationals)",
          "Assistantships (Teaching / Research)",
          "Tuition waivers and stipends for PhD programs",
          "Scholarship availability depends on academic excellence, test scores, and early application.",
        ]}
      />

      <Subheading>Documents Checklist – USA Student Visa (F-1)</Subheading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Mandatory Documents
          </div>
          <BulletList
            items={[
              "Valid passport",
              "Academic certificates & transcripts",
              "English language test results",
              "I-20 issued by the institution",
              "SEVIS fee payment receipt",
              "DS-160 confirmation",
              "Financial documents (tuition + living cost proof)",
            ]}
          />
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            Additional Documents
          </div>
          <BulletList
            items={[
              "Standardized test scores (if required)",
              "Statement of Purpose / Study Plan",
              "Sponsor documents",
              "Ties to home country evidence",
            ]}
          />
        </div>
      </div>

      <Subheading>
        USA Student Visa Application Fee (from Bangladesh)
      </Subheading>
      <BulletList
        items={[
          "SEVIS fee: USD 350",
          "US Visa (F-1) application fee: USD 185",
          "Courier / service charges (if applicable)",
          "Fees are payable online and non-refundable.",
        ]}
      />

      <Subheading>Approximate Visa Processing & Decision Time</Subheading>
      <BulletList
        items={[
          "Visa decision is made after the embassy interview",
          "Interview wait times vary by season",
          "Passport return typically within 3–10 working days after approval",
        ]}
      />

      <Subheading>Important Advisory</Subheading>
      <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
        US student visas are interview-driven and credibility-focused. Visa
        approval depends heavily on academic clarity, financial strength, career
        intent, and ability to articulate study plans and home-country ties.
        Elite Visa Global provides interview preparation, document alignment,
        and case strategy to strengthen your application.
      </p>

      <AccentCallout>
        Follow your dreams—with preparation that speaks for itself. Elite Visa
        Global supports your US study journey with insight, structure, and
        professionalism.
      </AccentCallout>
    </Section>
  );
}

/* =========================
   UAE (Visit/Family/Business)
========================= */

function UaeVisit() {
  return (
    <Section
      id="uae"
      title="United Arab Emirates (UAE)"
      subtitle="End-to-end assistance to ensure correct visa type selection and compliant submission."
    >
      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
        UAE visas are generally short-term, sponsor-based, and processed
        electronically, making accuracy of documents and sponsor details
        critical. Elite Visa Global provides end-to-end assistance to ensure
        correct visa type selection and compliant submission.
      </p>

      <Subheading>Tourist / Visit Visa (UAE)</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Leisure travel, sightseeing, short-term personal visits (without family sponsorship).",
          },
          {
            k: "Common Visa Validity",
            v: "30 days (single or multiple entry), 60 days (single or multiple entry). Extendable in some cases (subject to UAE rules).",
          },
          {
            k: "Required Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (minimum 6 months validity)",
                  "Passport-size photograph (white background)",
                  "National ID (NID) copy",
                  "Travel history (if available)",
                  "Hotel booking or address in UAE",
                  "Return or onward ticket (recommended)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "UAE Tourist Visa Fee (Approx.)",
            v: "30-day: BDT 10,000 – 15,000; 60-day: BDT 15,000 – 20,000 (fees vary based on sponsor, entry type, and processing time)",
          },
          { k: "Approximate Processing Time", v: "3–7 working days" },
        ]}
      />

      <Subheading>Family Visit Visa (UAE)</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Visiting close family members legally residing in the UAE.",
          },
          {
            k: "Sponsor",
            v: "UAE resident (spouse, parent, child, or close relative) with valid residence visa.",
          },
          {
            k: "Applicant Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (6 months validity)",
                  "Photograph (white background)",
                  "National ID copy",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Sponsor Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "UAE residence visa copy",
                  "Emirates ID",
                  "Passport copy",
                  "Salary certificate or labor contract",
                  "Tenancy contract (Ejari)",
                  "Proof of relationship (birth certificate / marriage certificate, attested if required)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "UAE Family Visit Visa Fee (Approx.)",
            v: "30-day: BDT 12,000 – 18,000; 60-day: BDT 18,000 – 25,000",
          },
          { k: "Approximate Processing Time", v: "5–10 working days" },
        ]}
      />

      <Subheading>Business Visa (UAE)</Subheading>
      <KeyValueGrid
        rows={[
          {
            k: "Purpose",
            v: "Business meetings, exhibitions, conferences, short-term commercial visits (not valid for employment).",
          },
          {
            k: "Sponsor",
            v: "UAE-based company, event organizer, or registered business entity.",
          },
          {
            k: "Applicant Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Passport (6 months validity)",
                  "Photograph (white background)",
                  "National ID copy",
                  "Previous travel history (if available)",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "Business Documents",
            v: (
              <ul className="mt-1 space-y-1">
                {[
                  "Invitation letter from UAE company",
                  "Trade license of UAE sponsor",
                  "Cover letter stating purpose of visit",
                  "Meeting or event details",
                ].map((x) => (
                  <li key={x} className="text-sm text-slate-800">
                    • {x}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            k: "UAE Business Visa Fee (Approx.)",
            v: "30-day: BDT 15,000 – 22,000; 60-day: BDT 20,000 – 30,000",
          },
          { k: "Approximate Processing Time", v: "5–10 working days" },
        ]}
      />

      <Subheading>Important Notes (UAE Visas)</Subheading>
      <BulletList
        items={[
          "UAE visas are sponsor-dependent; accuracy of sponsor documents is critical",
          "Visa validity, entry type, and extension rules may change without notice",
          "Overstaying can result in fines and future travel restrictions",
          "Employment is strictly prohibited on visit or business visas",
          "Elite Visa Global ensures your UAE visa application is correctly categorized, accurately documented, and submitted through authorized channels.",
        ]}
      />

      <AccentCallout>
        Follow your dreams—travel with confidence. Elite Visa Global guides your
        UAE visit with professionalism and care.
      </AccentCallout>
    </Section>
  );
}
