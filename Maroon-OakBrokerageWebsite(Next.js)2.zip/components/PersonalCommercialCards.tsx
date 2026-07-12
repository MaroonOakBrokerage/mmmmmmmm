import Image from "next/image";
import Link from "next/link";
import { heroImages, type HeroImage } from "@/lib/data";
import {
  HomeIcon,
  BuildingIcon,
  CarIcon,
  FamilyIcon,
  UmbrellaIcon,
  ShieldIcon,
  WorkersIcon,
} from "./Icons";
import Reveal from "./Reveal";

type SubItem = { label: string; Icon?: typeof HomeIcon };

const personalItems: SubItem[] = [
  { label: "Auto", Icon: CarIcon },
  { label: "Home", Icon: HomeIcon },
  { label: "Life", Icon: FamilyIcon },
  { label: "Umbrella", Icon: UmbrellaIcon },
  { label: "And More" },
];

const commercialItems: SubItem[] = [
  { label: "General Liability", Icon: ShieldIcon },
  { label: "Workers' Comp", Icon: WorkersIcon },
  { label: "Commercial Auto", Icon: CarIcon },
  { label: "Property", Icon: BuildingIcon },
  { label: "And More" },
];

function BigCard({
  href,
  image,
  Icon,
  eyebrow,
  title,
  description,
  ctaLabel,
  items,
}: {
  href: string;
  image: HeroImage;
  Icon: typeof HomeIcon;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  items: SubItem[];
}) {
  return (
    <div className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden rounded-2xl border border-charcoal/10 shadow-sm transition-shadow duration-500 hover:shadow-lg">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95" />
      <span className="absolute bottom-2.5 right-3 z-10 text-[9px] text-white/45">Photo: {image.credit}</span>

      <div className="relative z-10 ml-8 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-maroon shadow-md md:ml-10">
        <Icon className="h-6 w-6 stroke-stone" />
      </div>

      <div className="relative z-10 px-8 pb-8 md:px-10 md:pb-10">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">{eyebrow}</p>
        <h3 className="mb-3 font-serif text-[30px] font-semibold leading-tight text-stone md:text-[34px]">
          {title}
        </h3>
        <p className="mb-6 max-w-[380px] font-sans text-[14.5px] leading-relaxed text-stone/78">{description}</p>
        <Link
          href={href}
          className="mb-8 inline-flex items-center gap-2 rounded border border-stone/35 px-6 py-3 text-[12.5px] font-bold uppercase tracking-wide text-stone transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
        >
          {ctaLabel}
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone/15 pt-6">
          {items.map(({ label, Icon: ItemIcon }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11.5px] font-medium text-stone/70">
              {ItemIcon ? (
                <ItemIcon className="h-4 w-4 stroke-gold/80" />
              ) : (
                <span className="flex h-4 w-4 items-center justify-center text-gold/80" aria-hidden="true">
                  +
                </span>
              )}
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Two large, photography-led cards — the site's clearest statement that
// Maroon Oak covers both households and businesses without treating either
// as an afterthought. Deliberately oversized so this reads as a decision
// point, not a navigation menu.
export default function PersonalCommercialCards() {
  return (
    <section id="personal-commercial" className="scroll-mt-24 bg-ink py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[3px] text-gold">What We Cover</p>
        <h2 className="mx-auto mb-14 max-w-[720px] text-center font-serif text-3xl font-semibold text-stone md:text-[38px]">
          Personal &amp; Commercial Insurance, In One Place
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal direction="left">
            <BigCard
              href="/personal-insurance"
              image={heroImages.homeExterior}
              Icon={HomeIcon}
              eyebrow="Personal Insurance"
              title="Protect What Matters Most."
              description="Your home, your family, your future. Coverage built around your actual life, not a generic bundle."
              ctaLabel="Explore Personal"
              items={personalItems}
            />
          </Reveal>
          <Reveal direction="right" delay={120}>
            <BigCard
              href="/business-insurance"
              image={heroImages.dataCenterAerial}
              Icon={BuildingIcon}
              eyebrow="Commercial Insurance"
              title="Protect Your Business."
              description="Focus on growth — we'll handle the risk. Coverage built around how your business actually operates."
              ctaLabel="Explore Commercial"
              items={commercialItems}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
