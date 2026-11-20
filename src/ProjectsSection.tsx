import { projects, type Project } from './data/projects'
import styles from './ProjectsSection.module.css'

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className={styles.projectMedia} role="img" aria-label={`Captura real de ${project.name} pendiente de incorporar`}>
      <span className={styles.mediaIndex}>{project.id === 'mapte' ? '01' : '—'}</span>
      <span className={styles.mediaMessage}>CAPTURA REAL<br />PENDIENTE</span>
      <span className={styles.mediaCaption}>{project.name} / VISTA DEL PROYECTO</span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardClass = project.featured
    ? `${styles.projectCard} ${styles.featuredCard}`
    : styles.projectCard

  return (
    <article className={cardClass} aria-labelledby={`project-${project.id}`}>
      <ProjectMedia project={project} />
      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span>{project.featured ? 'PROYECTO DESTACADO' : 'PROYECTO'}</span>
          {project.context && <span>{project.context}</span>}
        </div>
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
  const [featuredProject, ...otherProjects] = projects

  return (
    <section className={styles.projects} id="projects" aria-labelledby="projects-title">
      <div className={styles.sectionMeta}><span>03 / SELECCIÓN</span><span>TRABAJO RECIENTE</span></div>
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>PROYECTOS DESTACADOS</p>
        <h2 id="projects-title">Ideas hechas<br /><em>proyecto.</em></h2>
        <p className={styles.intro}>Una selección de aplicaciones y herramientas que he desarrollado.</p>
      </header>

      {featuredProject && <ProjectCard project={featuredProject} />}
      <div className={styles.projectGrid}>
        {otherProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
      </div>
    </section>
  )
}

export default ProjectsSection
