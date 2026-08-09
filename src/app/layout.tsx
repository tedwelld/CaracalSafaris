import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "primeicons/primeicons.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LenisProvider from "@/components/layout/LenisProvider";
import { NavbarThemeProvider } from "@/contexts/NavbarThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { siteConfig } from "@/data/siteConfig";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - Private Safaris in Zimbabwe, Zambia & Botswana`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logo,
        alt: `${siteConfig.name} logo`,
      },
    ],
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bokunLoader = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${siteConfig.bokunChannelUUID}`;
  const bokunConfigured = !siteConfig.bokunChannelUUID.startsWith("00000000");

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var h=new Date().getHours();if(h>=6&&h<18)document.documentElement.classList.add('theme-light');else document.documentElement.classList.remove('theme-light');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {bokunConfigured && <Script src={bokunLoader} strategy="afterInteractive" />}
        <NavbarThemeProvider>
          <CartProvider>
            <LenisProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <MobileBottomNav />
              <WhatsAppButton />
              <CartDrawer />
            </LenisProvider>
          </CartProvider>
        </NavbarThemeProvider>
      </body>
    </html>
  );
}
