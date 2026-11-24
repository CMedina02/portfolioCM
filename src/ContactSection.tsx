import PortfolioFooter from './PortfolioFooter'
import styles from './ContactSection.module.css'

const whatsapp = 'https://wa.me/529994159987'
const linkedin = 'https://www.linkedin.com/in/cristian-eduardo-medina-pech-130a79429/'

function ContactSection() {
  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.content}>
        <div>
          <p className={styles.eyebrow}>Contacto</p>
          <h2 id="contact-title" tabIndex={-1}>¿Qué quieres <em>construir?</em></h2>
          <p className={styles.invitation}>Escríbeme si tienes un proyecto en mente, quieres colaborar o buscas un desarrollador backend o full stack para tu equipo.</p>
        </div>
        <div className={styles.channels}>
          <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noreferrer">
            <span>Escríbeme por WhatsApp</span><span aria-hidden="true">↗</span>
          </a>
          <a className={styles.linkedin} href={linkedin} target="_blank" rel="noreferrer">
            <span>Conecta conmigo en LinkedIn</span><span aria-hidden="true">↗</span>
          </a>
          <p className={styles.location}>Mérida, Yucatán · México</p>
        </div>
      </div>
      <PortfolioFooter />
    </section>
  )
}

export default ContactSection
