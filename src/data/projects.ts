export type Project = {
  id: string
  name: string
  description: string
  highlights: string[]
  technologies: string[]
  repository: string
  context?: string
  contribution?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'mapte',
    name: 'MAPTE',
    description: 'Visor creado en equipo para planificar rutas simuladas en Marte y estimar qué trayectos permiten regresar a la base con suficiente oxígeno.',
    highlights: ['Elegir paradas y consultar la pendiente del terreno.', 'Evaluar el oxígeno restante y el regreso a la base en cada parada.'],
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'Three.js'],
    repository: 'https://github.com/CMedina02/Mapte',
    context: 'NASA Space Apps Challenge 2026',
    contribution: 'Desarrollé la API de rutas con FastAPI y la lógica para evaluar el consumo de oxígeno y la reserva de regreso.',
    featured: true,
  },
  {
    id: 'kanbanproject',
    name: 'KANBANPROJECT',
    description: 'Aplicación web para administrar tareas en tableros Kanban, con columnas, movimiento de tarjetas, comentarios, cronómetros y métricas.',
    highlights: ['Mover tarjetas entre columnas para actualizar el estado de las tareas.', 'Registrar tiempo, dejar comentarios y revisar métricas del tablero.'],
    technologies: ['Node.js', 'Express', 'JavaScript', 'SQLite'],
    repository: 'https://github.com/CMedina02/KanbanProject',
  },
  {
    id: 'pizzeria-paco',
    name: 'PIZZERIA PACO 2.0',
    description: 'Sistema de punto de venta de escritorio para gestionar pedidos, productos, personal, inventario básico y operaciones de caja.',
    highlights: ['Armar pedidos desde el catálogo y registrar operaciones de caja.', 'Gestionar productos, personal e inventario básico desde la aplicación.'],
    technologies: ['React', 'Tauri', 'Rust', 'SQLite'],
    repository: 'https://github.com/CMedina02/PizzeriaPaco2.0-POS',
  },
  {
    id: 'produccion-merma',
    name: 'PRODUCCION-MERMA',
    description: 'Aplicación web para gestionar registros de producción y calcular los materiales necesarios considerando porcentajes de merma.',
    highlights: ['Registrar la producción y consultar sus datos.', 'Calcular el material requerido al sumar la merma prevista.'],
    technologies: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    repository: 'https://github.com/CMedina02/Produccion-Merma',
  },
]
