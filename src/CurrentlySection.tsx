import styles from './CurrentlySection.module.css'

const activities = [
  'Fortaleciendo mis conocimientos en arquitectura Backend y Full Stack.',
  'Desarrollando aplicaciones con Flutter, Python y Java.',
  'Aprendiendo sobre diseño de APIs y bases de datos.',
  'Trabajando en proyectos de software modular y empresarial.',
]

function CurrentlySection() {
  return (
    <section className={styles.section} id="currently" aria-labelledby="currently-title">
      <div className={styles.content}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>ACTUALMENTE</p>
          <h2 id="currently-title" tabIndex={-1}>En constante<br /><em>construcción</em></h2>
        </header>
        <ol className={styles.activityList}>
          {activities.map((activity, index) => (
            <li key={activity}>
              <span className={styles.activityIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span>{activity}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default CurrentlySection
