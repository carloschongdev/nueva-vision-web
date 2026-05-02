"use client";

export default function BibleButton() {
  return (
    <a
      href="https://www.bible.com/bible"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leer Biblia"
      className="fixed bottom-6 left-6 z-50 group"
    >
      <span className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary-900 text-white text-xs font-sans font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Leer Biblia
      </span>
      <div className="w-14 h-14 rounded-full bg-[#6b278b] shadow-lg shadow-[#6b278b]/40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
        <svg fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5} className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    </a>
  );
}
