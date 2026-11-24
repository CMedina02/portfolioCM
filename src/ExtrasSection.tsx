import styles from './ExtrasSection.module.css'

const hackathons = [
  {
    title: 'NASA Space Apps Challenge',
    date: '2026-10',
    dateLabel: 'Octubre de 2026',
    description: 'Desarrollé la API de rutas de MAPTE con FastAPI y la lógica para estimar el consumo de oxígeno.',
  },
  {
    title: 'Hackathon 3.0',
    date: '2025-04',
    dateLabel: 'Abril de 2025',
    description: 'En un reto de 36 horas del Tec de Mérida, creamos Trazo para generar CV con IA para RODAI.',
  },
  {
    title: 'Hackathon 2.0',
    date: '2024-03',
    dateLabel: 'Marzo de 2024',
    description: 'En un reto de 36 horas del Tec de Mérida, creamos una app de reportes por voz para EJAD.',
  },
]

export default function ExtrasSection() {
  return (
    <section className={styles.section} id="extras" aria-labelledby="extras-title">
      <header>
        <p className={styles.eyebrow}>EXTRAS</p>
        <h2 id="extras-title" tabIndex={-1}>Hackathons</h2>
      </header>
      <ul className={styles.events} role="list">
        {hackathons.map(({ title, date, dateLabel, description }) => (
          <li key={date}>
            <time dateTime={date}>{dateLabel}</time>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
