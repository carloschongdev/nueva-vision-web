import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BibleButton from "@/components/BibleButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Iglesia Nueva Visión La Misericordia | Panamá",
    template: "%s | Nueva Visión La Misericordia",
  },
  description:
    "Iglesia Nueva Visión La Misericordia en Panamá. Un lugar donde puedes conocer a Dios, crecer en fe y ser parte de una comunidad que transforma vidas.",
  keywords: ["iglesia", "cristiana", "panamá", "nueva visión", "misericordia"],
  robots: { index: true, follow: true },
  icons: {
    icon: "/mercy.svg",
    shortcut: "/mercy.svg",
    apple: "/mercy.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-white text-primary-800`}>
        {/* Mercy Church USA affiliation bar */}
        <div className="w-full bg-[#6b278b] px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <a
              href="https://www.mercychurchofgod.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-purple-200 text-[11px] font-sans font-medium hidden sm:inline whitespace-nowrap">
                Parte de
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mercy-church-usa.png"
                alt="Mercy Church of God"
                style={{ height: 28, width: "auto", display: "block", filter: "brightness(0) invert(1)" }}
              />
            </a>
            <span className="text-purple-200/70 text-[11px] font-sans hidden md:inline whitespace-nowrap">
              Mercy Church of God · mercychurchofgod.org
            </span>
          </div>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BibleButton />
      </body>
    </html>
  );
}