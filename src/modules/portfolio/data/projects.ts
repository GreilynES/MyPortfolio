import type { Project } from "../../../shared/types/project";

export const projects: Project[] = [
  {
    id: "Municipalidad",
    title: "Municipalidad",
    shortDescription:
      "Sistema web para gestionar información y procesos administrativos municipales.",
    technologies: ["React", "TypeScript", ".NET", "SQL Server"],
    links: [
      { label: "GitHub", href: "PON_AQUI_EL_LINK" },
    ],
  },
  {
    id: "p-ganaderos",
    title: "Cámara de Ganaderos",
    shortDescription:
      "Aplicación para registro/gestión de información relacionada a asociados y fincas (proyecto en desarrollo).",
    technologies: ["React", "TypeScript", "NestJS", "MySQL"],
    links: [
      { label: "GitHub", href: "PON_AQUI_EL_LINK" },
    ],
  },
  {
    id: "juego",
    title: "Juego en tiempo real",
    shortDescription:
      "info",
    technologies: ["React Native", "Expo"],
    links: [
      { label: "GitHub", href: "PON_AQUI_EL_LINK" },
    ],
  },
];