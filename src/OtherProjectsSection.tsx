import { otherProjects } from './data/otherProjects'
import styles from './OtherProjectsSection.module.css'

function OtherProjectsSection() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="other-projects-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>OTROS PROYECTOS</p>
        <h2 id="other-projects-title" tabIndex={-1}>Más trabajo,<br /><em>otras ideas.</em></h2>
      </header>
      <div className={styles.projectGrid}>
        {otherProjects.map((project, index) => (
          <article data-project-card className={styles.project} key={project.name}>
            <div className={styles.projectMeta}><span>{String(index + 1).padStart(2, '0')}</span><span>PROYECTO</span></div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ul className={styles.technologies} aria-label={`Tecnologías de ${project.name}`}>
              {project.technologies.map((technology) => <li key={`${project.name}-${technology}`}>{technology}</li>)}
            </ul>
            <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Ver repositorio de ${project.name} en GitHub`}>
              Ver repositorio <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OtherProjectsSection
