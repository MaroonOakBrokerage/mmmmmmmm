import Image from "next/image";
import { carrierPartners } from "@/lib/data";

// Grayscale-to-color logo strip beneath the hero cards — the quiet proof
// point that "independent brokerage" isn't just a claim. Logos are rendered
// at a fixed height so mismatched source aspect ratios don't break the row;
// each one lifts into full color on hover.
export default function CarrierLogos() {
  return (
    <section className="border-b border-charcoal/8 bg-stone py-16">
      <div className="mx-auto max-w-[1100px] px-8 text-center">
        <p className="mb-10 font-sans text-[15px] text-[#55504a]">
          We partner with top-rated carriers to deliver the right coverage at the right price.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {carrierPartners.map((carrier) => (
            <div key={carrier.name} className="relative h-9 w-[130px] grayscale opacity-70 transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <Image
                src={carrier.logo}
                alt={carrier.name}
                fill
                sizes="130px"
                className="object-contain object-center"
              />
            </div>
          ))}
          <span className="font-sans text-sm font-medium text-[#8a8178]">And more&hellip;</span>
        </div>
      </div>
    </section>
  );
}
