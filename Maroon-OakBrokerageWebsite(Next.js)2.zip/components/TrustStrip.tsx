import { trustPoints } from "@/lib/data";
import { FamilyIcon, ShieldCheckIcon, CompassIcon, HeartHandIcon } from "./Icons";
import Reveal from "./Reveal";

const iconFor: Record<string, typeof FamilyIcon> = {
  "People First": FamilyIcon,
  "Tailored Protection": ShieldCheckIcon,
  "Independent Advantage": CompassIcon,
  "Above the Line": HeartHandIcon,
};

// Quiet credibility band directly beneath the hero. Four short, left-aligned
// promises with a plain outline icon — reassurance before the sell, in the
// register of a wealth-management firm rather than a feature-badge grid.
export default function TrustStrip() {
  return (
    <section className="border-b border-charcoal/8 bg-stone py-12">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-4">
          {trustPoints.map((point, i) => {
            const Icon = iconFor[point.title] ?? ShieldCheckIcon;
            return (
              <Reveal key={point.title} delay={i * 90}>
                <Icon className="mb-3 h-7 w-7 stroke-maroon" />
                <h3 className="mb-1.5 font-serif text-[16px] font-semibold leading-tight text-maroon">
                  {point.title}
                </h3>
                <p className="max-w-[210px] font-sans text-[12.5px] leading-snug text-[#6b655d]">
                  {point.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
