export interface ExperienceItem {
  id: string;
  companyOrOrg: string; // empresa o institución
  role: string; // cargo o título del puesto
  startDate?: string; // "2024-01" o "Enero 2024"
  endDate?: string;  // "2024-06" o "Junio 2024" o "Actualidad"
  responsibilities?: string[]; // tareas, logros o proyectos relevantes
  technologies?: string[]; // herramientas, lenguajes o metodologías utilizadas
}