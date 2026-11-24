import type { Project } from './projects'

export const otherProjects: Project[] = [
  {
    id: 'compiladosr',
    name: 'Compiladosr',
    description: 'Analizador y mini compilador desarrollado en Python, con optimización y generación de código ensamblador 8086.',
    highlights: ['Analizar una entrada y optimizarla como parte de la compilación.', 'Generar código ensamblador para el 8086.'],
    technologies: ['Python', 'Ensamblador 8086'],
    repository: 'https://github.com/CMedina02/Compiladosr',
  },
  {
    id: 'login-bear-animation',
    name: 'login_bear_animation',
    description: 'Interfaz de inicio de sesión desarrollada con Flutter y animaciones Rive.',
    highlights: ['Explorar un flujo de inicio de sesión construido en Flutter.', 'Ver la animación del oso integrada con Rive.'],
    technologies: ['Flutter', 'Rive'],
    repository: 'https://github.com/CMedina02/login_bear_animation',
  },
]
