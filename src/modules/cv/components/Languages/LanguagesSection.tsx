import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { languages } from "../../data/languages";

const LEVEL_COPY: Record<string, string> = {
  native: "Dominio nativo",
  advanced: "Comunicación fluida",
  intermediate: "Buen nivel funcional",
  basic: "Base en desarrollo",
};

function LanguageCard({ name, level, notes }: { name: string; level: string; notes?: string }) {
  const progress = level === "native" ? 100 : level === "advanced" ? 82 : level === "intermediate" ? 62 : 38;

  return (
    <article
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: "linear-gradient(180deg, var(--bg-surface-strong), var(--bg-surface))",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div className="absolute right-4 top-4 flex gap-[5px]" aria-hidden="true">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="h-[10px] w-[10px] rounded-full"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              boxShadow: "var(--stud-shadow)",
            }}
          />
        ))}
      </div>

      <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
        Language Slot
      </p>
      <h3 className="font-serif text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
        {name}
      </h3>
      <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
        {LEVEL_COPY[level] ?? level}
      </p>
      {notes && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {notes}
        </p>
      )}

      <div className="mt-5 h-2 rounded-full" style={{ background: "var(--bg-elevated)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: "linear-gradient(to right, var(--accent), var(--accent-blue))" }}
        />
      </div>
    </article>
  );
}

export default function LanguagesSection() {
  return (
    <SectionLayout id="languages">
      <div className="mb-12">
        <p className="section-label mb-2 font-mono text-[0.75rem] uppercase tracking-[0.1em]" aria-hidden="true">
          // 04. languages
        </p>
        <div className="flex items-end gap-4">
          <h2
            className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
          >
            Idiomas
          </h2>
          <div className="section-divider mb-2 h-[2px] max-w-[120px] flex-1" aria-hidden="true" />
        </div>
        <p className="section-kicker mt-3 max-w-[520px] font-mono text-[0.82rem] leading-relaxed">
          Cómo me comunico y me muevo entre contextos técnicos, académicos y profesionales.
        </p>
      </div>

      {languages.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin datos todavía)
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {languages.map((language) => (
            <LanguageCard key={language.id} name={language.name} level={language.level} notes={language.notes} />
          ))}
        </div>
      )}
    </SectionLayout>
  );
}