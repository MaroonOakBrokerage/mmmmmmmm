"use client";

import { useState } from "react";
import Link from "next/link";
import { CarIcon, HomeIcon, BuildingIcon } from "./Icons";
import { OakRingAccent } from "./SectionDivider";

type ClaimType = "auto" | "home" | "business";

const tabs: { id: ClaimType; label: string; Icon: typeof CarIcon; description: string; reviewHref: string }[] = [
  {
    id: "auto",
    label: "Auto Claim",
    Icon: CarIcon,
    description:
      "Move to a safe location if possible, document the scene, and contact your auto carrier's claims line using the number on your ID card. Exchange information with any other drivers involved.",
    reviewHref: "/personal-insurance#auto",
  },
  {
    id: "home",
    label: "Home Claim",
    Icon: HomeIcon,
    description:
      "Prevent further damage where it's safe to do so (like a temporary tarp or shutting off water), photograph the damage before cleanup, and contact your homeowners or renters carrier directly.",
    reviewHref: "/personal-insurance#home",
  },
  {
    id: "business",
    label: "Business Claim",
    Icon: BuildingIcon,
    description:
      "Secure the property, document the loss with photos and a written account, and contact the carrier for the specific policy involved — property, liability, auto, or workers' comp.",
    reviewHref: "/business-insurance",
  },
];

export default function ClaimTypeTabs() {
  const [active, setActive] = useState<ClaimType>("auto");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Choose a claim type">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 rounded-full border px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide transition-all duration-300 ${
              active === tab.id
                ? "border-maroon bg-maroon text-stone shadow-[0_10px_24px_rgba(58,10,24,0.25)] -translate-y-0.5"
                : "border-maroon/20 bg-white text-maroon shadow-sm hover:-translate-y-0.5 hover:border-maroon/40 hover:shadow-md"
            }`}
          >
            <tab.Icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <div
        key={active}
        role="tabpanel"
        className="motion-safe:animate-fadeUp relative mx-auto max-w-[720px] overflow-hidden rounded-xl border border-charcoal/10 bg-white p-10 text-center shadow-md"
      >
        <OakRingAccent className="pointer-events-none absolute -bottom-16 -right-16 h-[220px] w-[220px] text-gold/[0.07]" />
        <div className="relative z-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-maroon/[0.06]">
            <current.Icon className="h-7 w-7 stroke-maroon" />
          </div>
          <p className="mb-6 font-sans text-[15px] leading-relaxed text-[#55504a]">{current.description}</p>
          <Link
            href={current.reviewHref}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gold-dim transition-colors duration-200 hover:text-maroon"
          >
            Review This Coverage
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
