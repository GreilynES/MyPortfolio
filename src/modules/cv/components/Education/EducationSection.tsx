
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { education } from "../../data/education";

/* ── Ícono graduación ─────────────────────────────────────────── */
function IconGrad() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}


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

/* ── Card educación minimalista ───────────────────────────────── */
function EducationCard({
  institution,
  program,
  startDate,
  endDate,
  index,
}: {
  institution: string;
  program: string;
  startDate?: string;
  endDate?: string;
  index: number;
}) {

  const accentColors = ["#e8a838", "#57a4d8", "#30c06f", "#c084fc"];
  const accent = accentColors[index % accentColors.length];

  return (
    <article
      className="overflow-hidden rounded-[24px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
        <div
          className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
        >
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(180deg, ${accent}22, ${accent}12)`,
                border: `1px solid ${accent}40`,
                color: accent,
                boxShadow:
                  "0 10px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <IconGrad />
            </div>

            <div className="min-w-0">
              <p
                className="font-mono text-[0.68rem] uppercase tracking-[0.12em]"
                style={{ color: accent }}
              >
                {startDate ?? "?"} — {endDate ?? "Actualidad"}
              </p>
              <p
                className="mt-1 truncate font-mono text-[0.67rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--text-subtle)" }}
              >
                {institution}
              </p>
            </div>
          </div>

          <h4
            className="font-serif text-[1.2rem] leading-snug sm:text-[1.28rem]"
            style={{ color: "var(--text-primary)", fontWeight: 500 }}
          >
            {program}
          </h4>
        </div>
      </div>
    </article>
  );
}

/* ── Chips decorativos ────────────────────────────────────────── */
function AboutChip({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
      style={{
        background: "linear-gradient(180deg, var(--bg-surface-strong), var(--bg-surface))",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <span
        className="h-3 w-3 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}70`,
        }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function EducationSection() {
  return (
    <SectionLayout id="education">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
      {/* Columna izquierda: Sobre mí */}
      <div className="max-w-[640px]">

      {/* studs decorativos */}
      <div className="flex gap-[6px] mb-4" aria-hidden="true">
        <span className="h-[9px] w-[9px] rounded-full"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 10px rgba(232,168,56,0.25)"
          }}
        />
        <span className="h-[9px] w-[9px] rounded-full"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            boxShadow: "var(--stud-shadow)"
          }}
        />
        <span className="h-[9px] w-[9px] rounded-full"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            boxShadow: "var(--stud-shadow)"
          }}
        />
      </div>

      <h2
        className="font-serif font-bold leading-tight"
        style={{
          fontSize: "clamp(1.8rem,3vw,2.6rem)",
          color: "var(--text-primary)"
        }}
      >
        Construyendo software
        <br />
        <span style={{ color: "var(--accent)" }}>
          pieza por pieza
        </span>
      </h2>

      <p
        className="mt-5 font-mono text-[0.78rem] uppercase tracking-[0.12em]"
        style={{ color: "var(--text-subtle)" }}
      >
        desarrollo web • full stack • sistemas
      </p>

      <div
        className="mt-7 h-px w-[120px]"
        style={{
          background: "linear-gradient(to right,var(--accent),transparent)"
        }}
      />

      {/* texto */}
      <div className="mt-8 space-y-5 text-[0.98rem] leading-8">

        <p style={{ color: "var(--text-muted)" }}>
          Soy Greilyn Esquivel Salazar y actualmente curso la carrera de
          Ingeniería en Sistemas. Me gusta entender cómo funcionan las
          cosas y transformar ideas en soluciones digitales claras.
        </p>

        <p style={{ color: "var(--text-muted)" }}>
          Me interesa el desarrollo web full stack, donde puedo combinar
          interfaces limpias con una lógica sólida en backend y manejo
          estructurado de datos.
        </p>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <AboutChip label="Ing. en Sistemas" color="#ff8a65" />
        <AboutChip label="Full-Stack" color="#f1c40f" />
        <AboutChip label="UI/UX" color="#57a4d8" />
        <AboutChip label="Bases de Datos" color="#30c06f" />
      </div>

    </div>
        {/* Columna derecha: educación */}
        <div>
          <div
            className="overflow-hidden rounded-[28px] p-5 sm:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
              border: "1px solid var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex gap-[6px]" aria-hidden="true">
                <LegoStud size={11} />
                <LegoStud size={11} />
                <LegoStud size={11} />
              </div>

              <p
                className="font-mono text-[0.68rem] uppercase tracking-[0.12em]"
                style={{ color: "var(--text-subtle)" }}
              >
                01 / Formación
              </p>
            </div>


            <h3
              className="mt-2 font-serif text-2xl font-bold leading-tight"
              style={{ color: "var(--accent)" }}
            >
              Mi base académica
            </h3>

            <div className="mt-7 space-y-4">
              {education.length === 0 ? (
                <p
                  className="font-mono text-[0.85rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  (Sin datos todavía)
                </p>
              ) : (
                education.map((e, i) => (
                  <EducationCard
                    key={e.id}
                    institution={e.institution}
                    program={e.program}
                    startDate={e.startDate}
                    endDate={e.endDate}
                    index={i}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}