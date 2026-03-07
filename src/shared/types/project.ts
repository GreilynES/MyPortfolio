export type ProjectMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; title?: string };

export interface ProjectLink {
  label: string; // "GitHub", "Demo", "Detalles"
  href: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  media?: ProjectMedia[];
  links?: { label: string; href: string }[];
  image?: string;
}