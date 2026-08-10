import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Caracal Africa Safaris — WhatsApp, email or a planning form for private safaris from Victoria Falls.",
};

export default function ContactPage() {
  return (
    <>
      <div className="h-20 bg-[var(--bg)] transition-colors duration-400" />

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <SectionLabel>Get in touch</SectionLabel>
            <h1
              className="text-[var(--fg)] text-5xl md:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Let&apos;s plan
              <br />
              <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
                your safari.
              </span>
            </h1>
            <p className="text-[var(--fg-60)] leading-relaxed mb-10 max-w-md">
              Whether you have firm dates or are still exploring options, message us.
              We reply within 24 hours with next steps.
            </p>

            {/* Quick Actions */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-[var(--accent)]/30 rounded-sm hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <i className="pi pi-whatsapp text-white" style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="text-[var(--fg)] font-medium">Start a WhatsApp Chat</p>
                  <p className="text-[var(--fg-50)] text-sm">Fastest response — usually within minutes</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-5 border border-[var(--fg-10)] rounded-sm hover:border-[var(--fg-30)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--fg-10)] flex items-center justify-center flex-shrink-0">
                  <i className="pi pi-envelope" style={{ color: "var(--accent)", fontSize: "18px" }} />
                </div>
                <div>
                  <p className="text-[var(--fg)] font-medium">Send an Email</p>
                  <p className="text-[var(--fg-50)] text-sm">{siteConfig.email}</p>
                </div>
              </a>

              <Link
                href="/plan-your-journey"
                className="flex items-center gap-4 p-5 border border-[var(--fg-10)] rounded-sm hover:border-[var(--fg-30)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--fg-10)] flex items-center justify-center flex-shrink-0">
                  <i className="pi pi-file-edit" style={{ color: "var(--accent)", fontSize: "18px" }} />
                </div>
                <div>
                  <p className="text-[var(--fg)] font-medium">Submit a Journey Enquiry</p>
                  <p className="text-[var(--fg-50)] text-sm">Our detailed multi-step form</p>
                </div>
              </Link>
            </div>
          </ScrollReveal>

          {/* Contact details */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-10 pt-8 lg:pt-24">
              <div>
                <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">Location</p>
                <p className="text-[var(--fg)]">{siteConfig.location}</p>
                <p className="text-[var(--fg-50)] text-sm mt-1">
                  Serving the entire Victoria Falls Triangle
                </p>
              </div>
              <div>
                <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">Response Time</p>
                <p className="text-[var(--fg-70)] text-sm">
                  We respond to all enquiries within 24 hours. WhatsApp is fastest.
                </p>
              </div>
              <div>
                <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">Follow Our Journeys</p>
                <div className="flex gap-4">
                  {Object.entries(siteConfig.socials).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--fg-50)] hover:text-[var(--accent)] transition-colors capitalize text-sm"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
