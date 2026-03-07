import type { Project } from "../../../shared/types/project";

export const projects: Project[] = [
  {
  id: "p-ganaderos",
  title: "Cámara de Ganaderos",
  shortDescription:
    "Sistema web informativo y administrativo desarrollado para digitalizar procesos internos, gestión presupuestaria y control de información administrativa mediante una arquitectura full stack.",
  technologies: ["React", "Node.js", "MySQL", "APIs REST"],
  image: "/Images/projects/camara-ganaderos.jpg",
  links: [
    {
      label: "Sitio web",
      href: "https://www.camaraganaderoshojancha.cloud/",
    },
    {
      label: "Informativo Frontend",
      href: "https://github.com/GreilynES/CamaraDeGanaderos_Informative_App_Front.git",
    },
    {
      label: "Administrativo Frontend",
      href: "https://github.com/GreilynES/CamaraDeGanaderos_Administrative_App_Front.git",
    },
    {
      label: "Backend",
      href: "https://github.com/GreilynES/CamaraDeGanaderos_App_Backend.git",
    },
  ],
},
  {
    id: "p-municipal",
    title: "Sistema de Gestión Municipal",
    shortDescription:
      "Sistema web full stack para administrar contribuyentes, inmuebles y trámites municipales, integrando frontend en React y TypeScript, backend en .NET y base de datos en SQL Server.",
    technologies: ["React", "TypeScript", ".NET", "SQL Server"],
    image: "/Images/projects/sistema-municipal.jpg",
    links: [
      {
        label: "Frontend",
        href: "https://github.com/GreilynES/MunicipalManagementSystem-frontend.git",
      },
      {
        label: "Backend",
        href: "https://github.com/GreilynES/MunicipalManagementSystem-backend.git",
      },
      {
        label: "Base de datos",
        href: "https://github.com/GreilynES/DataBase-MunicipalManagementSystem.git",
      },
    ],
  },
  {
    id: "p-stroop",
    title: "Stroop Game",
    shortDescription:
      "Proyecto académico de comunicación en tiempo real con arquitectura cliente-servidor, donde se implementó sincronización de eventos, manejo de conexiones concurrentes y lógica interactiva de juego.",
    technologies: ["React", ".NET", "SignalR", "Tiempo real"],
    image: "/Images/projects/stroop-game.jpg",
    links: [
      {
        label: "Frontend",
        href: "https://github.com/GreilynES/StroopGame-Frontend.git",
      },
      {
        label: "Backend",
        href: "https://github.com/GreilynES/StroopGame-Back.git",
      },
    ],
  },
];