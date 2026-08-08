import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

const destinations = ["Victoria Falls", "Livingstone", "Chobe", "Hwange National Park"];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-alt)] text-[var(--fg-70)] border-t border-[var(--fg-10)] transition-colors duration-400">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={220}
                height={80}
                className="h-16 w-auto max-w-[200px] object-contain mb-3"
              />
              <p className="text-[var(--accent)] text-xs tracking-widest uppercase">
                The Smoke That Thunders
              </p>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Private journeys through Zimbabwe, Zambia &amp; Botswana within the
              Victoria Falls Triangle. Local expertise, dual-licensed guides,
              seamless cross-border travel.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "Twitter"].map((s) => (
                <a
                  key={s}
                  href={siteConfig.socials[s.toLowerCase() as keyof typeof siteConfig.socials]}
                  className="text-xs text-[var(--fg-50)] hover:text-[var(--accent)] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Destinations
            </h3>
            <ul className="space-y-3">
              {destinations.map((d) => (
                <li key={d}>
                  <Link
                    href={`/destinations/${d.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm hover:text-[var(--fg)] transition-colors"
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--fg)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[var(--fg)] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-[var(--fg-40)]">
                Victoria Falls, Zimbabwe
              </li>
              <li className="pt-2">
                <Link
                  href="/plan-your-journey"
                  className="inline-block bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2 rounded text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Plan Your Journey →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--fg-10)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--fg-30)]">
          <p>© {new Date().getFullYear()} Caracal Safaris. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-[var(--fg-60)] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[var(--fg-60)] transition-colors">Contact</Link>
            <Link href="/plan-your-journey" className="hover:text-[var(--fg-60)] transition-colors">Plan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
