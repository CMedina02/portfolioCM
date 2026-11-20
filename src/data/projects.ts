export type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  repository: string
  context?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'mapte',
    name: 'MAPTE',
    description: 'Plataforma web interactiva creada en equipo para explorar Marte con planificación de rutas simuladas y visualización geoespacial.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'Three.js'],
    repository: 'https://github.com/CMedina02/Mapte',
    context: 'NASA Space Apps Challenge 2026',
    featured: true,
  },
  {
    id: 'kanbanproject',
    name: 'KANBANPROJECT',
    description: 'Aplicación web para administrar tareas en tableros Kanban, con columnas, movimiento de tarjetas, comentarios, cronómetros y métricas.',
    technologies: ['Node.js', 'Express', 'JavaScript', 'SQLite'],
    repository: 'https://github.com/CMedina02/KanbanProject',
  },
  {
    id: 'pizzeria-paco',
    name: 'PIZZERIA PACO 2.0',
    description: 'Sistema de punto de venta de escritorio para gestionar pedidos, productos, personal, inventario básico y operaciones de caja.',
    technologies: ['React', 'Tauri', 'Rust', 'SQLite'],
    repository: 'https://github.com/CMedina02/PizzeriaPaco2.0-POS',
  },
  {
    id: 'produccion-merma',
    name: 'PRODUCCION-MERMA',
    description: 'Aplicación web para gestionar registros de producción y calcular los materiales necesarios considerando porcentajes de merma.',
    technologies: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    repository: 'https://github.com/CMedina02/Produccion-Merma',
  },
]
