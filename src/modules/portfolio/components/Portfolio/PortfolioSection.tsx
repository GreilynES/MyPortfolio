import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { projects } from "../../data/projects";

export default function PortfolioSection() {
  return (
    <SectionLayout id="portfolio">
      <div>
        <h2>Portafolio</h2>

        {projects.length === 0 ? (
          <p>(Sin proyectos todavía)</p>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong> — {p.shortDescription}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionLayout>
  );
}