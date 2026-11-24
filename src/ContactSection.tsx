import styles from './ContactSection.module.css'

const whatsapp = 'https://wa.me/529994159987'

function ContactSection() {
  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div>
        <p className={styles.eyebrow}>Contacto</p>
        <h2 id="contact-title" tabIndex={-1}>¿Qué quieres <em>construir?</em></h2>
        <p className={styles.invitation}>Escríbeme si tienes un proyecto en mente, quieres colaborar o buscas un desarrollador backend o full stack para tu equipo.</p>
      </div>
      <div className={styles.channels}>
        <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noreferrer">
          <span>Escríbeme por WhatsApp</span><span aria-hidden="true">↗</span>
        </a>
        <a className={styles.github} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
          <span>Ver mi perfil en GitHub</span><span aria-hidden="true">↗</span>
        </a>
        <p className={styles.location}>Mérida, Yucatán · México</p>
      </div>
    </section>
  )
}

export default ContactSection
