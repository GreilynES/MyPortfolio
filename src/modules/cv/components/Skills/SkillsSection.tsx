
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { skills } from "../../data/skills";

/* ── Colores por categoría ────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  Frontend:  "#2980b9",
  Backend:   "#27ae60",
  Database:  "#8e44ad",
  DevOps:    "#d35400",
  Tools:     "#16a085",
  default:   "#e8a838",
};

/* ── Stud LEGO ─────────────────────────────────────────────────── */
function Stud({ color = "var(--bg-elevated)" }: { color?: string }) {
  return (
    <span
      className="w-[10px] h-[10px] rounded-full flex-shrink-0"
      style={{
        background: color,
        border: "1px solid var(--border)",
        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Tarjeta de categoría ─────────────────────────────────────── */
function CategoryCard({
  category,
  skillsList,
  color
}: {
  category: string;
  skillsList: typeof skills;
  color: string;
  index: number;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
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
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 0 rgba(0,0,0,0.15)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Barra superior de color */}
      <div className="h-[3px] w-full" style={{ background: color }} />

      {/* Header con studs */}
      <div className="px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Studs decorativos */}
            <div className="flex gap-[4px]" aria-hidden="true">
              <Stud color={color} />
              <Stud color={color} />
            </div>
            <h3 className="font-serif font-bold text-[1.05rem]" style={{ color: "var(--text-primary)" }}>
              {category}
            </h3>
          </div>
          <span
            className="font-mono text-[0.62rem] tracking-[0.1em] uppercase px-2 py-[2px] rounded"
            style={{ background: `${color}20`, color: color, border: `1px solid ${color}40` }}
          >
            {skillsList.length} piezas
          </span>
        </div>
      </div>

      {/* Lista de habilidades */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.03em] px-3 py-[5px] rounded transition-all duration-150 hover:-translate-y-[1px]"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                boxShadow: "0 2px 0 rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: color }}
                aria-hidden="true"
              />
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Sombra inferior */}
      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function SkillsSection() {
  /* Agrupar skills por categoría */
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "Otras";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categories = Object.keys(grouped);

  return (
    <SectionLayout id="skills">
      {/* Encabezado */}
      <div className="mb-12">
        <p
          className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[#e8a838] mb-2"
          aria-hidden="true"
        >
          // 03. toolbox
        </p>
        <div className="flex items-end gap-4">
          <h2
            className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
          >
            Habilidades
          </h2>
          <div
            className="flex-1 h-[2px] mb-2 max-w-[100px]"
            style={{ background: "linear-gradient(to right, #e8a838, transparent)" }}
            aria-hidden="true"
          />
        </div>
        <p
          className="mt-3 font-mono text-[0.82rem] max-w-[440px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Las piezas técnicas que uso para construir soluciones.
        </p>
      </div>

      {/* Grid de categorías */}
      {skills.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin datos todavía)
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat}
              category={cat}
              skillsList={grouped[cat]}
              color={CATEGORY_COLORS[cat] || CATEGORY_COLORS.default}
              index={i}
            />
          ))}
        </div>
      )}
    </SectionLayout>
  );
}
