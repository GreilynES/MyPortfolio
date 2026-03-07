import type { SkillItem } from "../../../shared/types/skill";

export const skills: SkillItem[] = [
  { id: "s-react", name: "React", level: "intermediate", category: "Frontend" },
  { id: "s-js", name: "JavaScript", level: "intermediate", category: "Frontend" },
  { id: "s-ts", name: "TypeScript", level: "intermediate", category: "Frontend" },
  { id: "s-html", name: "HTML", level: "intermediate", category: "Frontend" },
  { id: "s-css", name: "CSS", level: "intermediate", category: "Frontend" },
  { id: "s-tailwind", name: "Tailwind", level: "intermediate", category: "Frontend" },

  { id: "s-node", name: "Node.js", level: "intermediate", category: "Backend" },
  { id: "s-dotnet", name: ".NET", level: "basic", category: "Backend" },
  { id: "s-csharp", name: "C#", level: "basic", category: "Backend" },
  { id: "s-signalr", name: "SignalR", level: "basic", category: "Backend" },
  { id: "s-rest", name: "APIs REST", level: "intermediate", category: "Backend" },
  { id: "s-rabbitmq", name: "RabbitMQ", level: "basic", category: "Backend" },

  { id: "s-mysql", name: "MySQL", level: "advanced", category: "Database" },
  { id: "s-sqlserver", name: "SQL Server", level: "basic", category: "Database" },
   { id: "s-sql", name: "SQL", level: "intermediate", category: "Database" },

  { id: "s-azuredevops", name: "Azure DevOps", level: "basic", category: "Tools" },

  { id: "s-github", name: "GitHub", level: "intermediate", category: "Tools" },
  { id: "s-postman", name: "Postman", level: "intermediate", category: "Tools" },
  { id: "s-devcpp", name: "Dev-C++", level: "basic", category: "Tools" },
  { id: "s-vscode", name: "VS Code", level: "advanced", category: "Tools" },
  { id: "s-visualstudio", name: "Visual Studio", level: "intermediate", category: "Tools" },

  { id: "s-cpp", name: "C++", level: "basic", category: "Backend" },
];

export const softSkills: string[] = [
  "Trabajo en equipo",
  "Pensamiento analítico",
  "Resolución de problemas",
  "Adaptabilidad",
  "Aprendizaje continuo",
  "Mentalidad de mejora",
];