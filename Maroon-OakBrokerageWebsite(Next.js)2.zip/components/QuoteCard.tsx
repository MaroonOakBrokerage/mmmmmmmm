"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { personalCoverageOptions, businessCoverageOptions } from "@/lib/data";
import { HomeIcon, BuildingIcon, LockIcon } from "./Icons";

type Protecting = "personal" | "business";

// The floating glass quote panel that lives inside the hero. Deliberately
// short — one decision (Personal vs. Commercial) and one field — because its
// job is to earn a click, not to collect a full application. The full,
// branching intake lives in <QuoteForm /> on /contact#quote; this hands off
// to it with the visitor's answers pre-filled via query params so nothing
// they've already told us gets asked twice.
export default function QuoteCard() {
  const router = useRouter();
  const headingId = useId();
  const [protecting, setProtecting] = useState<Protecting>("personal");
  const [coverage, setCoverage] = useState("");

  const coverageOptions = useMemo(
    () => (protecting === "personal" ? personalCoverageOptions : businessCoverageOptions),
    [protecting]
  );

  function handleProtectingChange(next: Protecting) {
    setProtecting(next);
    setCoverage("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({ protecting });
    if (coverage) params.set("coverage", coverage);
    router.push(`/contact?${params.toString()}#quote`);
  }

  const fieldLabel = "mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.12em] text-stone/60";
  const fieldControl =
    "w-full rounded-md border border-stone/20 bg-stone/[0.06] px-3.5 py-3 text-[14px] text-stone placeholder:text-stone/35 outline-none transition-colors duration-200 focus:border-gold focus:bg-stone/10";

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className="w-full max-w-[400px] rounded-2xl border border-stone/15 bg-ink/50 p-7 shadow-lg backdrop-blur-xl sm:p-8"
    >
      {/* Personal / Commercial segmented toggle */}
      <div
        role="tablist"
        aria-label="Personal or Commercial insurance"
        className="mb-6 flex w-full overflow-hidden rounded-md border border-stone/15"
      >
        {(["personal", "business"] as const).map((value) => {
          const Icon = value === "personal" ? HomeIcon : BuildingIcon;
          const active = protecting === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleProtectingChange(value)}
              className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-3 text-[11.5px] font-bold uppercase tracking-wide transition-colors duration-300 ${
                active ? "bg-maroon text-stone" : "bg-transparent text-stone/60 hover:bg-stone/5 hover:text-stone"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {value === "personal" ? "Personal Insurance" : "Commercial Insurance"}
            </button>
          );
        })}
      </div>

      <h2 id={headingId} className="mb-1.5 font-serif text-xl font-semibold text-stone">
        Let&rsquo;s Protect What Matters
      </h2>
      <p className="mb-6 font-sans text-[13px] leading-relaxed text-stone/60">
        Tell us a little about yourself and we&rsquo;ll find the right coverage for you.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label htmlFor="quotecard-coverage" className={fieldLabel}>
            Coverage Type
          </label>
          <div className="relative">
            <select
              id="quotecard-coverage"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              className={`${fieldControl} appearance-none pr-10`}
            >
              <option value="" className="text-charcoal">
                Select Coverage Type
              </option>
              {coverageOptions.map((option) => (
                <option key={option} value={option} className="text-charcoal">
                  {option}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-maroon px-6 py-4 text-[12.5px] font-bold uppercase tracking-wider text-stone shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-maroon-light hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Get Started
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-stone/45">
        <LockIcon className="h-3 w-3 stroke-stone/45" />
        Secure. Private. No Obligation.
      </div>
    </div>
  );
}
