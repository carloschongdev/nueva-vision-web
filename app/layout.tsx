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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BibleButton />
      </body>
    </html>
  );
}