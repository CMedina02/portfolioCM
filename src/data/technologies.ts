export type Technology = {
  name: string
  icon?: string
  textMark?: string
  featured?: boolean
}

export type TechnologyCategory = {
  id: string
  title: string
  technologies: Technology[]
}

export const technologyCategories: TechnologyCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    technologies: [
      { name: 'Flask', icon: 'flask' },
      { name: 'FastAPI', icon: 'fastapi', featured: true },
      { name: 'Node.js', icon: 'nodejs', featured: true },
      { name: 'Express', icon: 'express' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'APIs REST', textMark: 'REST' },
    ],
  },
  {
    id: 'languages',
    title: 'Lenguajes',
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'PHP', icon: 'php' },
      { name: 'C#', icon: 'csharp' },
      { name: 'SQL', textMark: 'SQL' },
      { name: 'Dart', icon: 'dart' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend y multiplataforma',
    technologies: [
      { name: 'React', icon: 'react' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Tauri', icon: 'tauri' },
    ],
  },
  {
    id: 'databases',
    title: 'Bases de datos',
    technologies: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'SQLite', icon: 'sqlite' },
    ],
  },
  {
    id: 'tools',
    title: 'Herramientas y entornos',
    technologies: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Linux', icon: 'linux' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
]
