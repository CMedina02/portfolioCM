import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { projects, type Project } from './data/projects'
import kanbanCapture from './assets/kanbanproject-captura.jpg'
import mapteRoute from './assets/mapte-route.webp'
import pizzeriaCapture from './assets/pizzeria-paco-captura.png'
import productionCapture from './assets/produccion-merma-captura.jpg'
import styles from './ProjectsSection.module.css'

type Capture = {
  src: string
  width: number
  height: number
  alt: string
  caption?: string
}

const captures: Partial<Record<string, Capture>> = {
  mapte: {
    src: mapteRoute,
    width: 1867,
    height: 961,
    alt: 'MAPTE muestra una ruta sobre el terreno de Marte con paradas, tiempo estimado y oxígeno restante.',
    caption: 'Captura de MAPTE · Ruta simulada en Marte',
  },
  kanbanproject: {
    src: kanbanCapture,
    width: 1600,
    height: 900,
    alt: 'Tablero Kanban con cuatro columnas, tarjetas de tareas, prioridades, tiempos y métricas de ejemplo.',
  },
  'pizzeria-paco': {
    src: pizzeriaCapture,
    width: 1280,
    height: 753,
    alt: 'Mostrador de Pizzería Paco con el catálogo de pizzas y una orden de ejemplo de 224 pesos.',
  },
  'produccion-merma': {
    src: productionCapture,
    width: 1425,
    height: 1342,
    alt: 'Calculadora de Producción Merma con la ficha de un suaje de ejemplo y un resultado de 92.45 metros lineales.',
  },
}

export type OpenProject = (project: Project, trigger: HTMLButtonElement) => void

export function ProjectMedia({ project, preview = false }: { project: Project; preview?: boolean }) {
  const capture = captures[project.id]
  if (!capture) return null

  return (
    <figure className={styles.projectCapture} data-project={project.id}>
      <div className={styles.captureMedia} data-preview={preview || undefined}>
        <img src={capture.src} width={capture.width} height={capture.height} alt={capture.alt} loading="lazy" decoding="async" />
      </div>
      <figcaption>
        {capture.caption && <span>{capture.caption}</span>}
        <a href={capture.src} target="_blank" rel="noreferrer" aria-label={`Ampliar captura de ${project.name}`}>
          Ampliar captura <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  )
}

export function ProjectDetailsButton({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  function open(event: MouseEvent<HTMLButtonElement>) {
    onOpen(project, event.currentTarget)
  }

  return (
    <button className={styles.detailsButton} type="button" aria-haspopup="dialog"
      aria-label={`Ver detalles de ${project.name}`} onClick={open}>
      Ver detalles <span aria-hidden="true">→</span>
    </button>
  )
}

export function ProjectDetails({ project, onOpen }: { project: Project; onOpen?: OpenProject }) {
  return (
    <>
      {project.contribution && <p className={styles.contribution}><strong>Mi aporte</strong>{project.contribution}</p>}
      {project.id === 'mapte' && (
        <details className={styles.projectNotes}>
          <summary>Cómo se evalúa una ruta</summary>
          <p>El visor muestra el terreno y las paradas. El planificador toma en cuenta el oxígeno, la reserva para el regreso y la pendiente máxima. En cada parada se puede consultar el oxígeno restante y evaluar si conviene continuar o volver a la base.</p>
        </details>
      )}
      <ul className={styles.technologyList} aria-label={`Tecnologías de ${project.name}`}>
        {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <div className={styles.cardActions}>
        {onOpen && <ProjectDetailsButton project={project} onOpen={onOpen} />}
        <a className={styles.repositoryLink} href={project.repository} target="_blank" rel="noreferrer" aria-label={`Ver repositorio de ${project.name} en GitHub`}>
          Ver repositorio <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  const cardClass = project.featured
    ? `${styles.projectCard} ${styles.featuredCard}`
    : styles.projectCard

  return (
    <article className={`${cardClass} ${styles.clickableCard}`} aria-labelledby={`project-${project.id}`}>
      <header className={styles.projectHeading}>
        {project.context && <p className={styles.projectMeta}>{project.context}</p>}
        <h3 id={`project-${project.id}`}>{project.name}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
      </header>
      <ProjectMedia project={project} preview={!project.featured} />
      <div className={styles.projectContent}>
        <ProjectDetails project={project} onOpen={onOpen} />
      </div>
    </article>
  )
}

function tiltProjectCard(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return

  const scene = event.currentTarget
  if (!scene.hasAttribute('data-tilted')) {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    scene.setAttribute('data-tilted', '')
  }

  const { left, top, width, height } = scene.getBoundingClientRect()
  const x = Math.max(-1, Math.min(1, (event.clientX - left) * 2 / width - 1))
  const y = Math.max(-1, Math.min(1, (event.clientY - top) * 2 / height - 1))
  scene.style.setProperty('--card-rotate-x', `${y * -9}deg`)
  scene.style.setProperty('--card-rotate-y', `${x * 9}deg`)
}

function resetProjectCardTilt({ currentTarget }: PointerEvent<HTMLDivElement>) {
  currentTarget.removeAttribute('data-tilted')
  currentTarget.style.removeProperty('--card-rotate-x')
  currentTarget.style.removeProperty('--card-rotate-y')
}

function ProjectsSection({ onOpen }: { onOpen: OpenProject }) {
  const [view, setView] = useState<'Galería' | 'Índice'>('Galería')
  const [{ index, direction }, setSelection] = useState({ index: 0, direction: '' })
  const previewRef = useRef<HTMLDivElement>(null)
  const selected = projects[index]
  const [featuredProject, ...otherProjects] = projects

  function selectProject(position: number, event: MouseEvent<HTMLButtonElement>) {
    setSelection(previous => position === previous.index
      ? previous
      : { index: position, direction: position > previous.index ? 'next' : 'previous' })

    const preview = previewRef.current
    if (event.detail > 0 && preview && window.matchMedia('(width < 760px)').matches &&
      preview.getBoundingClientRect().top > window.innerHeight - 72) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      requestAnimationFrame(() => preview.scrollIntoView({ behavior, block: 'start' }))
    }
  }

  return (
    <section className={styles.projects} id="projects" aria-labelledby="projects-title">
      <header className={styles.galleryHeader}>
        <h2 id="projects-title" tabIndex={-1}>Proyectos <em>seleccionados</em></h2>
        <div className={styles.switcher} role="group" aria-label="Presentación de proyectos">
          {(['Galería', 'Índice'] as const).map(option => (
            <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>
              {option}
            </button>
          ))}
        </div>
      </header>

      {view === 'Galería' ? (
        <>
          {featuredProject && <ProjectCard project={featuredProject} onOpen={onOpen} />}
          <div className={styles.projectGrid}>
            {otherProjects.map(project => (
              <div className={styles.projectCardScene} key={project.id} onPointerMove={tiltProjectCard}
                onPointerLeave={resetProjectCardTilt} onPointerCancel={resetProjectCardTilt}>
                <ProjectCard project={project} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.archive}>
          <div className={styles.archiveList} role="group" aria-label="Seleccionar proyecto">
            {projects.map((project, position) => (
              <button type="button" key={project.id} aria-pressed={selected.id === project.id}
                aria-controls="project-preview" onClick={event => selectProject(position, event)}>
                {project.name}<span aria-hidden="true">{selected.id === project.id ? '✓' : '→'}</span>
              </button>
            ))}
          </div>
          <div ref={previewRef} id="project-preview" className={styles.previewPane}>
            <div key={selected.id} className={styles.previewEntry} data-direction={direction}>
              <ProjectCard project={selected} onOpen={onOpen} />
            </div>
          </div>
        </div>
      )}

      <footer className={styles.projectsFooter}>
        <a className={styles.repositoryLink} href="https://github.com/CMedina02?tab=repositories" target="_blank" rel="noreferrer">
          Ver todos mis proyectos en GitHub <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  )
}

export default ProjectsSection
