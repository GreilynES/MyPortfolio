import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { skills } from "../../data/skills";

export default function SkillsSection() {
  return (
    <SectionLayout id="skills">
      <div>
        <h2>Habilidades</h2>

        {skills.length === 0 ? (
          <p>(Sin datos todavía)</p>
        ) : (
          <ul>
            {skills.map((s) => (
              <li key={s.id}>
                {s.name}
                {s.level ? ` — ${s.level}` : ""}
                {s.category ? ` (${s.category})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionLayout>
  );
}