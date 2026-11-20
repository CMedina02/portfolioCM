export type OtherProject = {
  name: string
  description: string
  technologies: string[]
  repository: string
}

export const otherProjects: OtherProject[] = [
  {
    name: 'Compiladosr',
    description: 'Analizador y mini compilador desarrollado en Python, con optimización y generación de código ensamblador 8086.',
    technologies: ['Python', 'Ensamblador 8086'],
    repository: 'https://github.com/CMedina02/Compiladosr',
  },
  {
    name: 'login_bear_animation',
    description: 'Interfaz de inicio de sesión desarrollada con Flutter y animaciones Rive.',
    technologies: ['Flutter', 'Rive'],
    repository: 'https://github.com/CMedina02/login_bear_animation',
  },
]
