import { technologyCategories } from './data/technologies'
import styles from './SkillsSection.module.css'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons'

function SkillsSection() {
  return (
    <section className={styles.skills} id="skills" aria-labelledby="skills-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>TECNOLOGÍAS Y HABILIDADES</p>
        <h2 id="skills-title" tabIndex={-1}>Herramientas para<br /><em>construir</em></h2>
        <p className={styles.intro}>El ecosistema técnico con el que diseño, desarrollo y despliego soluciones de principio a fin.</p>
      </header>

      <div className={styles.categoryGrid}>
        {technologyCategories.map(category => (
          <article className={styles.category} key={category.id} aria-labelledby={`category-${category.id}`}>
            <h3 id={`category-${category.id}`}>{category.title}</h3>
            <ul className={styles.technologyList}>
              {category.technologies.map(({ name, icon, textMark, featured }) => (
                <li className={styles.technology} key={name} data-featured={featured || undefined}>
                  {icon ? (
                    <img className={styles.icon} src={`${DEVICON_BASE}/${icon}/${icon}-original.svg`}
                      alt="" width="24" height="24" loading="lazy" decoding="async" />
                  ) : (
                    <span className={styles.textMark} aria-hidden="true">{textMark}</span>
                  )}
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className={styles.note}>Diseño, Desarrollo y Optimización de Software</p>
    </section>
  )
}

export default SkillsSection
