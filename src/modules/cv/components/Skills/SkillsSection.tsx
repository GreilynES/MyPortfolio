import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { skills, softSkills } from "../../data/skills";
import { languages } from "../../data/languages";

/* ── Colores por categoría ────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#297fb975",
  Backend: "#27ae5f81",
  Database: "#8d44ad7e",
  DevOps: "#d3540083",
  Tools: "#16a0847e",
  default: "#e8a7388c",
};

/* ── Etiquetas idiomas ────────────────────────────────────────── */
const LANGUAGE_LABELS: Record<string, string> = {
  native: "Nativo",
  advanced: "Avanzado",
  intermediate: "Intermedio",
  basic: "Básico",
};

/* ── Stud LEGO ────────────────────────────────────────────────── */
function Stud({ color = "var(--bg-elevated)" }: { color?: string }) {
  return (
    <span
      className="h-[10px] w-[10px] flex-shrink-0 rounded-full"
      style={{
        background: color,
        border: "1px solid var(--border)",
        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Tarjeta de categoría técnica ─────────────────────────────── */
function CategoryCard({
  category,
  skillsList,
  color,
}: {
  category: string;
  skillsList: typeof skills;
  color: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-[2px]"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${color}20, 0 4px 0 rgba(0,0,0,0.15)`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}60`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 0 rgba(0,0,0,0.15)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      <div className="h-[3px] w-full" style={{ background: color }} />

      <div
        className="px-5 pb-3 pt-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex gap-[4px]" aria-hidden="true">
              <Stud color={color} />
              <Stud color={color} />
            </div>

            <h3
              className="truncate font-serif text-[1.05rem] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {category}
            </h3>
          </div>

          <span
            className="whitespace-nowrap rounded px-2 py-[2px] font-mono text-[0.62rem] uppercase tracking-[0.1em]"
            style={{
              background: `${color}20`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            {skillsList.length} piezas
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5 rounded px-3 py-[5px] font-mono text-[0.72rem] tracking-[0.03em] transition-all duration-150 hover:-translate-y-[1px]"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                boxShadow: "0 2px 0 rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
                style={{ background: color }}
                aria-hidden="true"
              />
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
    </div>
  );
}

/* ── Card base para bloques secundarios ──────────────────────── */
function InfoCard({
  title,
  subtitle,
  countLabel,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  countLabel: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
    >
      <div className="h-[3px] w-full" style={{ background: accent }} />

      <div
        className="px-5 pb-3 pt-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex gap-[4px]" aria-hidden="true">
              <Stud color={accent} />
              <Stud color={accent} />
            </div>

            <div className="min-w-0">
              <h3
                className="truncate font-serif text-[1.05rem] font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em]"
                style={{ color: "var(--text-subtle)" }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          <span
            className="whitespace-nowrap rounded px-2 py-[2px] font-mono text-[0.62rem] uppercase tracking-[0.1em]"
            style={{
              background: `${accent}20`,
              color: accent,
              border: `1px solid ${accent}40`,
            }}
          >
            {countLabel}
          </span>
        </div>
      </div>

      <div className="px-5 py-4">{children}</div>

      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function SkillsSection() {
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "Otras";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const preferredOrder = ["Frontend", "Backend", "Database", "Tools", "DevOps", "Otras"];

  const categories = preferredOrder.filter((cat) => grouped[cat]?.length);

  return (
    <SectionLayout id="skills">
      <div className="mb-12">
        <div className="flex items-end gap-4">
          <h2
            className="font-serif font-bold leading-none"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            Habilidades
          </h2>

          <div
            className="mb-2 h-[2px] max-w-[100px] flex-1"
            style={{
              background: "linear-gradient(to right, #e8a838, transparent)",
            }}
            aria-hidden="true"
          />
        </div>

      </div>

      {skills.length === 0 && languages.length === 0 && softSkills.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin datos todavía)
        </p>
      ) : (
        <div className="space-y-8">
          {/* ── Técnicas ─────────────────────────────────────── */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <p
                className="font-mono text-[0.68rem] uppercase tracking-[0.12em]"
                style={{ color: "#e8a7388c" }}
              >
                Habilidades técnicas
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  skillsList={grouped[cat]}
                  color={CATEGORY_COLORS[cat] || CATEGORY_COLORS.default}
                />
              ))}
            </div>
          </div>

          {/* ── Complementario ──────────────────────────────── */}
          <div>


            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <InfoCard
                title="Habilidades blandas"
                subtitle="Fortalezas personales"
                countLabel={`${softSkills.length} items`}
                accent="#415f4d"
              >
                {softSkills.length === 0 ? (
                  <p
                    className="text-[0.92rem] leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Agrega aquí tus habilidades blandas.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded px-3 py-[5px] font-mono text-[0.72rem]"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                          boxShadow: "0 2px 0 rgba(0,0,0,0.1)",
                        }}
                      >
                        <span
                          className="h-[6px] w-[6px] rounded-full"
                          style={{ background: "#415f4d" }}
                          aria-hidden="true"
                        />
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </InfoCard>

              <InfoCard
                title="Idiomas"
                subtitle="Comunicación"
                countLabel={`${languages.length} niveles`}
                accent="#41585f"
              >
                {languages.length === 0 ? (
                  <p
                    className="text-[0.92rem] leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    (Sin idiomas todavía)
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {languages.map((language) => (
                      <div
                        key={language.id}
                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-3"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
                        }}
                      >
                        <div className="min-w-0">
                          <p
                            className="font-serif text-[1rem] font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {language.name}
                          </p>
                          {language.notes && (
                            <p
                              className="mt-1 text-[0.82rem]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {language.notes}
                            </p>
                          )}
                        </div>

                        <span
                          className="whitespace-nowrap rounded px-2 py-[3px] font-mono text-[0.62rem] uppercase tracking-[0.08em]"
                          style={{
                            background: "rgba(87,164,216,0.14)",
                            color: "#57a4d8",
                            border: "1px solid rgba(87,164,216,0.28)",
                          }}
                        >
                          {LANGUAGE_LABELS[language.level] ?? language.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </InfoCard>
            </div>
          </div>
        </div>
      )}
    </SectionLayout>
  );
}