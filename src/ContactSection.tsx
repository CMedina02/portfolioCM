import styles from './ContactSection.module.css'

function ContactSection() {
  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactMeta}><span>06 / CONTACTO</span><span>CONVERSEMOS</span></div>
      <div className={styles.contactContent}>
        <div>
          <p className={styles.eyebrow}>CONTACTO</p>
          <h2 id="contact-title">¿Construimos<br /><em>algo juntos?</em></h2>
          <p className={styles.invitation}>Si quieres conversar sobre desarrollo de software o colaborar en un proyecto, puedes encontrarme en GitHub.</p>
          <a className={styles.githubLink} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
            <span>Visita mi GitHub</span><span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.otherChannels} aria-label="Espacio reservado para otros medios de contacto">
          <span>OTROS MEDIOS</span>
          <p>Más formas de contacto<br />por agregar.</p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
