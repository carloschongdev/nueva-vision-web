interface Props {
  eyebrow?: string;
  title: string;
  italicPart?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, italicPart, subtitle, centered = true, light = false }: Props) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-[0.35em] mb-3 ${light ? "text-primary-300" : "text-primary-500"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl md:text-5xl font-semibold leading-tight ${light ? "text-white" : "text-primary-900"}`}>
        {title}{italicPart && <> <span className="italic text-primary-400">{italicPart}</span></>}
      </h2>
      <div className={`w-12 h-1 rounded-full bg-primary-500 my-5 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`text-base leading-relaxed max-w-xl ${centered ? "mx-auto" : ""} ${light ? "text-white/60" : "text-primary-900/55"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
