import Image from "next/image";
import Link from "next/link";
import type { HeroImage } from "@/lib/data";
import type { ComponentType } from "react";

type IconProps = { className?: string };

export default function PhotoCard({
  label,
  description,
  href,
  image,
  Icon,
}: {
  label: string;
  description: string;
  href: string;
  image?: HeroImage;
  Icon?: ComponentType<IconProps>;
}) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-charcoal/10 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-lg"
    >
      {image ? (
        <>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/40 to-transparent transition-colors duration-500 group-hover:from-ink/95" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep to-maroon transition-transform duration-700 ease-out group-hover:scale-[1.08]">
          {Icon && (
            <Icon className="absolute right-5 top-5 h-9 w-9 stroke-gold/40" />
          )}
        </div>
      )}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="relative z-10 p-5 transition-transform duration-500 group-hover:-translate-y-0.5">
        <h3 className="mb-1.5 font-serif text-[17px] font-semibold text-stone">{label}</h3>
        <p className="mb-3 font-sans text-[12px] leading-snug text-stone/80">{description}</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gold">
          Explore Coverage
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
