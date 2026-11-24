import { useRef, useState, type MouseEvent } from 'react'
import { projects, type Project } from './data/projects'
import mapteRoute from './assets/mapte-route.webp'
import styles from './ProjectsSection.module.css'

const boardColumns = [
  { name: 'Pendiente', tasks: ['Definir alcance', 'Revisar requisitos'] },
  { name: 'En curso', tasks: ['Diseñar la API', 'Preparar pruebas'] },
  { name: 'Listo', tasks: ['Crear tablero'] },
]

export type OpenProject = (project: Project, trigger: HTMLButtonElement) => void

export function ProjectMedia({ project }: { project: Project }) {
  if (project.id === 'mapte') {
    return (
      <figure className={styles.routeCapture}>
        <div className={styles.captureMedia}>
          <img src={mapteRoute} width={1867} height={961} loading="lazy" decoding="async"
            alt="MAPTE muestra una ruta sobre el terreno de Marte con paradas, tiempo estimado y oxígeno restante." />
          <a href={mapteRoute} target="_blank" rel="noreferrer">
            Ampliar captura <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figcaption>Captura de MAPTE · Ruta simulada en Marte</figcaption>
      </figure>
    )
  }

  const visual = project.id === 'kanbanproject' ? (
    <div className={styles.boardArtwork} aria-hidden="true">
      {boardColumns.map(({ name, tasks }) => (
        <div className={styles.boardColumn} key={name}>
          <b>{name}</b>
          {tasks.map(task => <span key={task}>{task}</span>)}
        </div>
      ))}
    </div>
  ) : project.id === 'pizzeria-paco' ? (
    <div className={styles.posArtwork} aria-hidden="true">
      <div className={styles.posMain}>
        <b>Catálogo</b>
        <span>Margarita</span>
        <span>Pepperoni</span>
        <span>Vegetariana</span>
      </div>
      <div className={styles.posSummary}>
        <b>Pedido</b>
        <span>1 × Margarita</span>
        <span>2 × Pepperoni</span>
        <strong>Cobrar →</strong>
      </div>
    </div>
  ) : (
    <div className={styles.productionArtwork} aria-hidden="true">
      <b>Plan de producción</b>
      <span>Material base<strong>100 kg</strong></span>
      <span>Merma prevista<strong>5 %</strong></span>
      <span>Material requerido<strong>105 kg</strong></span>
    </div>
  )

  return (
    <div className={styles.projectMedia} data-project={project.id} role="img" aria-label={`Ilustración editorial de ${project.name}`}>
      <div className={styles.artwork}>{visual}</div>
    </div>
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
      <ProjectMedia project={project} />
      <div className={styles.projectContent}>
        <ProjectDetails project={project} onOpen={onOpen} />
      </div>
    </article>
  )
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
            {otherProjects.map(project => <ProjectCard project={project} key={project.id} onOpen={onOpen} />)}
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
