"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NextServiceCTA from "./NextServiceCTA";

const links = [
  { label: "Inicio",        href: "/" },
  { label: "Nosotros",      href: "/about" },
  { label: "Predicaciones", href: "/sermons" },
  { label: "Contacto",      href: "/contact" },
];

const bibleUrl = "https://www.bible.com/bible";

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHeroPage = pathname === "/";
  const dark = scrolled || !isHeroPage;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        dark
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-primary-900/5"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between"
        style={{ height: "72px" }}
      >
        {/* ── Logo ──────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div
            className={`relative flex items-center justify-center transition-all duration-300 rounded-xl overflow-hidden ${
              dark ? "bg-transparent" : "bg-white/10 backdrop-blur-sm"
            }`}
            style={{ width: 100, height: 100 }}
          >
            <Image
              src="/iglesia.svg"
              alt="Logo"
              width={90}
              height={90}
              className={`object-contain transition-all duration-300 ${
                dark ? "opacity-100" : "brightness-0 invert opacity-90"
              }`}
              priority
            />
          </div>
          <div className="leading-none">
            <p
              className={`font-display font-semibold text-base leading-tight transition-colors duration-300 ${
                dark ? "text-primary-900" : "text-white"
              }`}
            >
              Nueva Visión
            </p>
            <p
              className={`text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-300 ${
                dark ? "text-primary-500" : "text-primary-300"
              }`}
            >
              La Misericordia
            </p>
          </div>
        </Link>

        {/* ── Desktop links ──────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? "text-primary-900 bg-primary-900/5"
                      : dark
                      ? "text-primary-900/70 hover:text-primary-900 hover:bg-primary-900/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={bibleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                dark
                  ? "text-primary-900/70 hover:text-primary-900 hover:bg-primary-900/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              title="Leer la Biblia en línea - Reina Valera 1960"
            >
              <BookIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Biblia</span>
            </a>
          </li>
        </ul>

        {/* ── CTA + Mercy logo ───────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <NextServiceCTA
            variant="amber"
            showBadge={true}
            className={`text-xs py-2.5 px-5 ${
              !dark ? "shadow-lg shadow-amber-500/30" : ""
            }`}
          />
          <a
            href="https://www.mercychurchofgod.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="Mercy Church of God"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mercy-church-usa.png"
              alt="Mercy Church of God"
              style={{ height: "40px", width: "auto", objectFit: "contain" }}
              className="bg-white rounded-lg px-2 py-1"
            />
          </a>
        </div>

        {/* ── Hamburger ──────────────────────────────── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                dark ? "bg-primary-900" : "bg-white"
              } ${
                i === 0 && menuOpen
                  ? "rotate-45 translate-y-2"
                  : i === 1 && menuOpen
                  ? "opacity-0"
                  : i === 2 && menuOpen
                  ? "-rotate-45 -translate-y-2"
                  : ""
              }`}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-b border-primary-900/5 shadow-lg`}
      >
        <div className="px-6 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                pathname === l.href
                  ? "bg-primary-900/5 text-primary-900 font-semibold"
                  : "text-primary-900/70 hover:bg-primary-900/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={bibleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary-900/70 hover:bg-primary-900/5 transition-colors duration-200"
          >
            <BookIcon className="w-4 h-4" />
            Biblia
          </a>
          <div className="pt-2 pb-1">
            <NextServiceCTA
              variant="amber"
              showBadge={false}
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
