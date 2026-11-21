import { useState } from 'react'
import { projects, type Project } from './data/projects'
import styles from './ProjectsSection.module.css'

function ProjectMedia({ project }: { project: Project }) {
  const visual = project.id === 'mapte' ? (
    <svg className={styles.mapArtwork} viewBox="0 0 560 300" aria-hidden="true">
      <path d="M24 68c54-44 74 12 123-11s81-41 128-10 88 31 126 1 79-23 135 11M0 122c56-40 86 8 139-13s88-34 131-6 83 30 121 2 96-20 169 6M20 188c52-38 85 6 137-16s88-31 131-3 79 26 118 0 93-15 142 10M16 244c60-30 86 8 140-13s83-27 126-2 79 22 122 0 91-13 145 8" />
      <path className={styles.routeLine} d="M92 217c56-31 58-100 134-91s72 89 145 61 55-95 112-92" />
      <circle cx="92" cy="217" r="6" /><circle cx="371" cy="187" r="6" /><circle cx="483" cy="95" r="6" />
      <circle className={styles.mapHalo} cx="371" cy="187" r="18" />
    </svg>
  ) : project.id === 'kanbanproject' ? (
    <div className={styles.boardArtwork} aria-hidden="true">
      {['BACKLOG', 'IN PROGRESS', 'DONE'].map((column, index) => (
        <div className={styles.boardColumn} key={column}><span>{column}</span><b>{['··', '↗', '✓'][index]}</b>
          {Array.from({ length: index === 1 ? 3 : 2 }, (_, card) => <i key={card} />)}
        </div>
      ))}
    </div>
  ) : project.id === 'pizzeria-paco' ? (
    <div className={styles.posArtwork} aria-hidden="true">
      <div className={styles.posRail}><i /><i /><i /><i /></div>
      <div className={styles.posMain}><span>CATÁLOGO</span><b>POS</b><i /><i /><i /></div>
      <div className={styles.posSummary}><span>SISTEMA</span><b>CAJA</b><i /><i /></div>
    </div>
  ) : (
    <svg className={styles.chartArtwork} viewBox="0 0 560 300" aria-hidden="true">
      <path className={styles.chartGrid} d="M46 45h466M46 100h466M46 155h466M46 210h466M46 265h466M46 45v220M155 45v220M264 45v220M373 45v220M482 45v220" />
      <path className={styles.chartFill} d="M46 220 108 180l60 22 68-96 59 31 74-70 62 45 71-79v232H46Z" />
      <path className={styles.chartLine} d="M46 220 108 180l60 22 68-96 59 31 74-70 62 45 71-79" />
      <circle cx="409" cy="112" r="6" /><circle cx="482" cy="33" r="6" />
    </svg>
  )

  return (
    <div className={styles.projectMedia} data-project={project.id} role="img" aria-label={`Ilustración editorial de ${project.name}`}>
      <div className={styles.artwork}>{visual}</div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardClass = project.featured
    ? `${styles.projectCard} ${styles.featuredCard}`
    : styles.projectCard

  return (
    <article data-project-card className={cardClass} aria-labelledby={`project-${project.id}`}>
      <ProjectMedia project={project} />
      <div className={styles.projectContent}>
        {project.context && <div className={styles.projectMeta}>{project.context}</div>}
        <h3 id={`project-${project.id}`}>{project.name}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <ul className={styles.technologyList} aria-label={`Tecnologías de ${project.name}`}>
          {project.technologies.map((technology) => (
            <li key={`${project.id}-${technology}`}>{technology}</li>
          ))}
        </ul>
        <a className={styles.repositoryLink} href={project.repository} target="_blank" rel="noreferrer" aria-label={`Ver repositorio de ${project.name} en GitHub`}>
          <span>Ver repositorio</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function ProjectsSection() {
  const [view, setView] = useState<'Galería' | 'Índice'>('Galería')
  const [selected, setSelected] = useState(projects[0])
  const [featuredProject, ...otherProjects] = projects

  return (
    <section className={styles.projects} id="projects" aria-labelledby="projects-title">
      <header className={styles.galleryHeader}>

        <h2 id="projects-title" tabIndex={-1}>Proyectos <em>seleccionados.</em></h2>
        <div className={styles.switcher} role="group" aria-label="Presentación de proyectos">
          {(['Galería', 'Índice'] as const).map(option => (
            <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>
              {option}
            </button>
          ))}
        </div>
      </header>

      {view === 'Galería' ? <>
      {featuredProject && <ProjectCard project={featuredProject} />}
      <div className={styles.projectGrid}>
        {otherProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
      </div>
      </> : (
        <div className={styles.archive}>
          <div className={styles.archiveList} role="group" aria-label="Seleccionar proyecto">
            {projects.map(project => (
              <button type="button" key={project.id} aria-pressed={selected.id === project.id}
                aria-controls="project-preview" onClick={() => setSelected(project)}>
                {project.name}<span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div id="project-preview" className={styles.previewPane}>
            <div key={selected.id} className={styles.previewEntry}><ProjectCard project={selected} /></div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjectsSection
