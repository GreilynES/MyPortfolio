
import { useState } from "react";
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { education } from "../../data/education";

/* ── Ícono graduación ─────────────────────────────────────────── */
function IconGrad() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      className="w-5 h-5" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

/* ── Ícono chevron ────────────────────────────────────────────── */
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Componente de entrada de educación ──────────────────────── */
function EducationCard({
  institution,
  program,
  startDate,
  endDate,
  notes,
  index,
}: {
  institution: string;
  program: string;
  startDate?: string;
  endDate?: string;
  notes?: string[];
  index: number;
}) {
  const [open, setOpen] = useState(true);

  /* Colores alternos para los bloques — paleta LEGO oscura */
  const blockColors = ["#a93226", "#1a5276", "#1e8449", "#b7950b", "#6c3483"];
  const color = blockColors[index % blockColors.length];

  return (
    <div className="relative flex gap-6 md:gap-10">

      {/* ── Columna izquierda: studs + línea ── */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Bloque con studs — el "nodo" del timeline */}
        <div className="relative flex flex-col items-center">
          {/* Studs encima del nodo */}
          <div className="flex gap-[4px] mb-[-2px]" aria-hidden="true">
            <span className="w-[10px] h-[10px] rounded-full"
              style={{ background: color, boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.3), 0 0 6px ${color}80` }} />
            <span className="w-[10px] h-[10px] rounded-full"
              style={{ background: color, boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.3), 0 0 6px ${color}80` }} />
          </div>
          {/* Nodo cuadrado */}
          <div className="w-10 h-10 rounded flex items-center justify-center text-white z-10 relative"
            style={{
              background: color,
              boxShadow: `0 4px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}>
            <IconGrad />
          </div>
        </div>
        {/* Línea punteada hacia abajo */}
        <div className="flex-1 w-[2px] mt-2 mb-0 min-h-[40px]"
          style={{
            background: `repeating-linear-gradient(to bottom, ${color}60 0px, ${color}60 6px, transparent 6px, transparent 12px)`,
          }} />
      </div>

      {/* ── Columna derecha: contenido ── */}
      <div className="flex-1 pb-10">
        {/* Fecha badge */}
        <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase px-2 py-[3px] rounded mb-3"
          style={{
            background: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}>
          {startDate ?? "?"} — {endDate ?? "Actualidad"}
        </span>

        {/* Tarjeta principal */}
        <div className="rounded-xl overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
          }}>
          {/* Header clicable */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
            style={{ borderBottom: open ? "1px solid var(--border)" : "none" }}
            aria-expanded={open}>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-mono text-[0.7rem] tracking-[0.06em] uppercase truncate"
                style={{ color: "var(--text-muted)" }}>
                {institution}
              </span>
              <span className="font-serif font-bold text-[1.05rem] leading-snug"
                style={{ color: "var(--text-primary)" }}>
                {program}
              </span>
            </div>
            <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>
              <IconChevron open={open} />
            </span>
          </button>

          {/* Notas desplegables */}
          <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
            {notes && notes.length > 0 && (
              <ul className="px-5 py-4 flex flex-col gap-2 list-none m-0">
                {notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.875rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}>
                    {/* Bullet ladrillo */}
                    <span className="mt-[5px] w-[6px] h-[6px] rounded-sm flex-shrink-0"
                      style={{ background: color }} aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function EducationSection() {
  return (
    <SectionLayout id="education">

      {/* Encabezado */}
      <div className="mb-12">
        <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[#e8a838] mb-2"
          aria-hidden="true">
          // 01. background
        </p>
        <div className="flex items-end gap-4">
          <h2 className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}>
            Educación
          </h2>
          <div className="flex-1 h-[2px] mb-2 max-w-[100px]"
            style={{ background: "linear-gradient(to right, #e8a838, transparent)" }}
            aria-hidden="true" />
        </div>
        <p className="mt-3 font-mono text-[0.82rem] max-w-[440px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}>
          Los bloques que forman mi base técnica y académica.
        </p>
      </div>

      {/* Timeline */}
      {education.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin datos todavía)
        </p>
      ) : (
        <div className="flex flex-col">
          {education.map((e, i) => (
            <EducationCard
              key={e.id}
              institution={e.institution}
              program={e.program}
              startDate={e.startDate}
              endDate={e.endDate}
              notes={e.notes}
              index={i}
            />
          ))}
        </div>
      )}

    </SectionLayout>
  );
}