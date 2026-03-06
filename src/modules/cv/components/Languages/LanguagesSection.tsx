import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { languages } from "../../data/languages";

export default function LanguagesSection() {
  return (
    <SectionLayout id="languages">
      <div>
        <h2>Idiomas</h2>

        {languages.length === 0 ? (
          <p>(Sin datos todavía)</p>
        ) : (
          <ul>
            {languages.map((l) => (
              <li key={l.id}>
                {l.name} — {l.level}
                {l.notes ? ` (${l.notes})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionLayout>
  );
}