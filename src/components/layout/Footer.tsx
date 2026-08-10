import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";
import { tours } from "@/data/tours";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "The Journey", href: "/journey" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Blogs", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Plan Your Journey", href: "/plan-your-journey" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

const linkClass =
  "text-sm text-[var(--fg-70)] hover:text-[var(--accent)] transition-colors";

export default function Footer() {
  return (
    <footer className="brand-surface bg-[var(--bg-alt)] text-[var(--fg-70)] border-t border-[var(--fg-10)] transition-colors duration-400">
      <div className="brand-surface__clip" aria-hidden>
        <div className="brand-surface__glow" />
      </div>
      <div className="container-luxury py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/caracal-logo.png"
                alt="Caracal Africa Safaris"
                width={240}
                height={88}
                className="h-16 w-auto max-w-[220px] object-contain mb-3"
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

          {/* Quick links */}
          <div>
            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations + Tours */}
          <div>
            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Destinations
            </h3>
            <ul className="space-y-3 mb-8">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link href={`/destinations/${d.slug}`} className={linkClass}>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Tours
            </h3>
            <ul className="space-y-3">
              {tours.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tours/${t.slug}`} className={linkClass}>
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blogs + Contact */}
          <div>
            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Blogs
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/blog" className={linkClass}>
                  All posts
                </Link>
              </li>
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className={linkClass}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[var(--accent)] text-xs tracking-widest uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-[var(--fg-40)]">{siteConfig.location}</li>
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

        <div className="mt-12 pt-8 border-t border-[var(--fg-10)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-[var(--fg-30)]">
          <p>© {new Date().getFullYear()} Caracal Safaris. All rights reserved.</p>
          <nav
            aria-label="Footer secondary links"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {quickLinks.map((link) => (
              <Link
                key={`bar-${link.href}`}
                href={link.href}
                className="hover:text-[var(--fg-60)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
