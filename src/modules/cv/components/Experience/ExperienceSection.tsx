import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { experience } from "../../data/experience";

/* ── Ícono portafolio / trabajo ──────────────────────────────── */
function IconBriefcase() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
  );
}

/* ── Ícono check ─────────────────────────────────────────────── */
function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className="h-3 w-3"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Ladrillo LEGO decorativo ───────────────────────────────── */
function LegoBrick({
  color = "#e8a838",
  studs = 2,
}: {
  color?: string;
  studs?: number;
}) {
  return (
    <div className="relative hidden sm:block" aria-hidden="true">
      <div
        className="flex gap-[5px] rounded-t px-[8px] pb-[8px] pt-[6px]"
        style={{
          background: color,
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.3), 0 8px 18px rgba(0,0,0,0.22)",
        }}
      >
        {Array.from({ length: studs }).map((_, i) => (
          <span
            key={i}
            className="relative h-[14px] w-[14px] rounded-full"
            style={{
              background: color,
              top: "-7px",
              filter: "brightness(1.12)",
              boxShadow:
                "inset 0 -2px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      <div
        className="h-[4px] rounded-b"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />
    </div>
  );
}

/* ── Stud simple ─────────────────────────────────────────────── */
function LegoStud({ size = 10 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        boxShadow: "var(--stud-shadow)",
      }}
    />
  );
}

/* ── Card de experiencia ─────────────────────────────────────── */
function ExperienceCard({
  companyOrOrg,
  role,
  startDate,
  endDate,
  responsibilities,
  technologies,
  setNumber,
}: {
  companyOrOrg: string;
  role: string;
  startDate?: string;
  endDate?: string;
  responsibilities?: string[];
  technologies?: string[];
  setNumber: number;
}) {
  const isActive = !endDate || endDate === "Actualidad";
  const accentColors = ["#7cc793", "#57a4d8", "#30c06f", "#ff8a65"];
  const accent = accentColors[(setNumber - 1) % accentColors.length];

  return (
    <article
      className="group relative overflow-hidden rounded-[26px] transition-all duration-300 hover:-translate-y-[3px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        aria-hidden="true"
      />

      <div className="px-5 pb-5 pt-5 sm:px-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex gap-[6px]" aria-hidden="true">
            <LegoStud size={9} />
            <LegoStud size={9} />
            <LegoStud size={9} />
          </div>

          <div className="flex items-center gap-2">
            {isActive && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] font-mono text-[0.62rem] uppercase tracking-[0.08em]"
                style={{
                  background: "rgba(48,192,111,0.12)",
                  color: "#30c06f",
                  border: "1px solid rgba(48,192,111,0.28)",
                }}
              >
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: "#30c06f", boxShadow: "0 0 8px #30c06f" }}
                />
                Activo
              </span>
            )}

            <span
              className="rounded px-2 py-[3px] font-mono text-[0.62rem] uppercase tracking-[0.08em]"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              Set #{String(setNumber).padStart(3, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(180deg, ${accent}22, ${accent}10)`,
              border: `1px solid ${accent}40`,
              color: accent,
              boxShadow:
                "0 10px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <IconBriefcase />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="font-mono text-[0.68rem] uppercase tracking-[0.12em]"
              style={{ color: accent }}
            >
              {startDate ?? "?"} — {endDate ?? "Actualidad"}
            </p>

            <p
              className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em]"
              style={{ color: "var(--text-subtle)" }}
            >
              {companyOrOrg}
            </p>

            <h3
              className="mt-2 font-serif text-[1.22rem] leading-snug sm:text-[1.32rem]"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {role}
            </h3>
          </div>
        </div>

        {responsibilities && responsibilities.length > 0 && (
          <div
            className="mt-5 pt-5"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-[10px] h-[7px] w-[7px] flex-shrink-0 rounded-full"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[0.93rem] leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {resp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {technologies && technologies.length > 0 && (
          <div
            className="mt-5 pt-5"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <p
              className="mb-3 font-mono text-[0.66rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--text-subtle)" }}
            >
              Piezas incluidas
            </p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-[5px] font-mono text-[0.7rem]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  <span style={{ color: accent }}>
                    <IconCheck />
                  </span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* ── Componente principal ────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <SectionLayout id="experience">
      <div className="relative">
        {/* Fondo FULL WIDTH real */}
        <div
            className="pointer-events-none absolute -top-16 -bottom-16 left-1/2 -translate-x-1/2 w-screen z-0"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle, var(--stud-dot-1) 1.5px, transparent 1.5px),
                  radial-gradient(circle, var(--stud-dot-2) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px, 15px 15px",
                backgroundPosition: "0 0, 7.5px 7.5px",
              }}
            />
        </div>

        {/* Contenido */}
        <div className="relative z-10">
          <div className="mb-12">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <div className="flex items-end gap-4">
                  <h2
                    className="font-serif font-bold leading-none"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Experiencia
                  </h2>

                  <div
                    className="mb-2 h-[2px] max-w-[100px] flex-1"
                    style={{
                      background:
                        "linear-gradient(to right, var(--accent), transparent)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="hidden md:flex items-start gap-3 pt-1" aria-hidden="true">
                <LegoBrick color="#57a4d8" studs={3} />
                <LegoBrick color="#7cc793" studs={3} />
              </div>
            </div>
          </div>

          {experience.length === 0 ? (
            <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
              (Sin datos todavía)
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {experience.map((x, i) => (
                <ExperienceCard
                  key={x.id}
                  companyOrOrg={x.companyOrOrg}
                  role={x.role}
                  startDate={x.startDate}
                  endDate={x.endDate}
                  responsibilities={x.responsibilities}
                  technologies={x.technologies}
                  setNumber={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
}