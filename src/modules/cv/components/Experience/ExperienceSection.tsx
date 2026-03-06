
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { experience } from "../../data/experience";

/* ── Ícono Wrench / Herramienta ──────────────────────────────── */
function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
  );
}

/* ── Ícono Check ──────────────────────────────────────────────── */
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      className="w-3 h-3" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Tarjeta de experiencia estilo manual LEGO ───────────────── */
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

  return (
    <div className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(232,168,56,0.1), 0 4px 0 rgba(0,0,0,0.15)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,168,56,0.3)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 0 rgba(0,0,0,0.15)"; (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
    >

      {/* ── Header estilo caja de set LEGO ── */}
      <div className="relative px-5 pt-5 pb-4"
        style={{ borderBottom: "1px solid var(--border)" }}>

        {/* Número de set — esquina superior derecha */}
        <div className="absolute top-4 right-5 flex items-center gap-2">
          {isActive && (
            <span className="flex items-center gap-1 font-mono text-[0.62rem] tracking-[0.06em] uppercase px-2 py-[2px] rounded-full"
              style={{ background: "rgba(39,174,96,0.15)", color: "#27ae60", border: "1px solid rgba(39,174,96,0.3)" }}>
              <span className="w-[5px] h-[5px] rounded-full bg-[#27ae60]"
                style={{ boxShadow: "0 0 6px #27ae60" }} aria-hidden="true" />
              Activo
            </span>
          )}
          <span className="font-mono text-[0.62rem] tracking-[0.1em] uppercase px-2 py-[2px] rounded"
            style={{ background: "var(--bg-elevated)", color: "var(--text-subtle)", border: "1px solid var(--border)" }}>
            Set #{String(setNumber).padStart(3, "0")}
          </span>
        </div>

        {/* Studs decorativos */}
        <div className="flex gap-[5px] mb-3" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="w-[9px] h-[9px] rounded-full"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)",
              }} />
          ))}
        </div>

        {/* Empresa + rol */}
        <div className="flex items-start gap-3 pr-24">
          <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 text-[#1a1200]"
            style={{ background: "#e8a838", boxShadow: "0 3px 0 #8a5e00" }}>
            <IconBriefcase />
          </div>
          <div>
            <p className="font-mono text-[0.72rem] tracking-[0.06em] uppercase mb-0.5"
              style={{ color: "var(--text-muted)" }}>
              {companyOrOrg}
            </p>
            <h3 className="font-serif font-bold text-[1.1rem] leading-tight"
              style={{ color: "var(--text-primary)" }}>
              {role}
            </h3>
          </div>
        </div>

        {/* Fecha */}
        <div className="mt-3 ml-12">
          <span className="font-mono text-[0.68rem] tracking-[0.05em]"
            style={{ color: "var(--text-subtle)" }}>
            {startDate ?? "?"} — {endDate ?? "Actualidad"}
          </span>
        </div>
      </div>

      {/* ── Cuerpo: pasos del manual ── */}
      <div className="px-5 py-4 flex flex-col gap-4">

        {/* Responsabilidades como pasos */}
        {responsibilities && responsibilities.length > 0 && (
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-3"
              style={{ color: "#e8a838" }}>
              Pasos de ensamblaje
            </p>
            <ol className="flex flex-col gap-2 list-none m-0 p-0">
              {responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  {/* Número de paso estilo manual */}
                  <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center font-mono text-[0.6rem] font-bold text-[#1a1200]"
                    style={{ background: "#e8a838", boxShadow: "0 2px 0 #8a5e00" }}>
                    {i + 1}
                  </span>
                  <span className="text-[0.875rem] leading-relaxed pt-[1px]"
                    style={{ color: "var(--text-muted)" }}>
                    {resp}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tecnologías — "piezas incluidas" */}
        {technologies && technologies.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.875rem" }}>
            <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2"
              style={{ color: "var(--text-subtle)" }}>
              Piezas incluidas
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.03em] px-2.5 py-[4px] rounded"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    boxShadow: "0 2px 0 rgba(0,0,0,0.1)",
                  }}>
                  <span className="text-[#27ae60]"><IconCheck /></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sombra base del ladrillo */}
      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <SectionLayout id="experience">

      {/* Encabezado */}
      <div className="mb-12">
        <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[#e8a838] mb-2"
          aria-hidden="true">
          // 02. experience
        </p>
        <div className="flex items-end gap-4">
          <h2 className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}>
            Experiencia
          </h2>
          <div className="flex-1 h-[2px] mb-2 max-w-[100px]"
            style={{ background: "linear-gradient(to right, #e8a838, transparent)" }}
            aria-hidden="true" />
        </div>
        <p className="mt-3 font-mono text-[0.82rem] max-w-[440px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}>
          Sets ensamblados con código real, propósito y aprendizaje continuo.
        </p>
      </div>

      {/* Cards */}
      {experience.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin datos todavía)
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

    </SectionLayout>
  );
}