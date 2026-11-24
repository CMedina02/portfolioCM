import { otherProjects } from './data/otherProjects'
import { ProjectDetailsButton, type OpenProject } from './ProjectsSection'
import cardStyles from './ProjectsSection.module.css'
import styles from './OtherProjectsSection.module.css'

function OtherProjectsSection({ onOpen }: { onOpen: OpenProject }) {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="other-projects-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>OTROS PROYECTOS</p>
        <h2 id="other-projects-title" tabIndex={-1}>Más trabajo,<br /><em>otras ideas</em></h2>
      </header>
      <div className={styles.projectGrid}>
        {otherProjects.map((project, index) => (
          <article className={`${styles.project} ${cardStyles.clickableCard}`} key={project.id}>
            <div className={styles.projectMeta}><span>{String(index + 1).padStart(2, '0')}</span><span>PROYECTO</span></div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ul className={styles.technologies} aria-label={`Tecnologías de ${project.name}`}>
              {project.technologies.map((technology) => <li key={`${project.name}-${technology}`}>{technology}</li>)}
            </ul>
            <div className={cardStyles.cardActions}>
              <ProjectDetailsButton project={project} onOpen={onOpen} />
              <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Ver repositorio de ${project.name} en GitHub`}>
                Ver repositorio <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OtherProjectsSection
