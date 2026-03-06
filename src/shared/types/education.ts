export interface EducationItem {
  id: string;
  institution: string;
  program: string; // carrera / técnico
  startDate?: string; // "2024"
  endDate?: string;   // "2026" o "Actualidad"
  notes?: string[];   // cursos relevantes, logros
}