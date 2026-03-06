import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { experience } from "../../data/experience";

export default function ExperienceSection() {
  return (
    <SectionLayout id="experience">
      <div>
        <h2>Experiencia</h2>

        {experience.length === 0 ? (
          <p>(Sin datos todavía)</p>
        ) : (
          <ul>
            {experience.map((x) => (
              <>
                <li key={x.id}>
                  {x.companyOrOrg} — {x.role} ({x.startDate ?? "?"} -{" "}
                  {x.endDate ?? "?"})
                </li>
                {x.responsibilities && (
                  <ul>
                    {x.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
                {x.technologies && (
                  <ul>
                    {x.technologies.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        )}
      </div>
    </SectionLayout>
  );
}