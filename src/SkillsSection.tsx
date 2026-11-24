import { technologyCategories, type Technology } from './data/technologies'
import styles from './SkillsSection.module.css'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons'
const SIMPLE_ICONS_BASE = 'https://cdn.simpleicons.org'

function getIconUrl(technology: Technology) {
  if (!technology.icon) return undefined

  if (technology.iconSource === 'simple-icons') {
    return `${SIMPLE_ICONS_BASE}/${technology.icon}/244739`
  }

  return `${DEVICON_BASE}/${technology.icon}/${technology.icon}-original.svg`
}

function SkillsSection() {
  return (
    <section className={styles.skills} id="skills" aria-labelledby="skills-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>TECNOLOGÍAS Y HABILIDADES</p>
        <h2 id="skills-title" tabIndex={-1}>Herramientas para<br /><em>construir</em></h2>
        <p className={styles.intro}>Lenguajes, frameworks y entornos que forman parte de mi stack.</p>
      </header>

      <div className={styles.categoryGrid}>
        {technologyCategories.map((category, index) => (
          <article className={styles.category} key={category.id} aria-labelledby={`category-${category.id}`}>
            <header className={styles.categoryHeader}>
              <span className={styles.categoryIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h3 id={`category-${category.id}`}>{category.title}</h3>
              <span className={styles.categoryCount}>{String(category.technologies.length).padStart(2, '0')}</span>
            </header>
            <ul className={styles.technologyList}>
              {category.technologies.map((technology) => {
                const iconUrl = getIconUrl(technology)

                return (
                  <li className={styles.technology} key={`${category.id}-${technology.name}`}>
                    {iconUrl ? (
                      <img className={styles.icon} src={iconUrl} alt="" aria-hidden="true" width="20" height="20" loading="lazy" decoding="async" />
                    ) : (
                      <span className={styles.textMark} aria-hidden="true">{technology.textMark}</span>
                    )}
                    <span>{technology.name}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
      <p className={styles.note}>Logotipos incluidos con fines de identificación de tecnologías.</p>
    </section>
  )
}

export default SkillsSection
