import Neofetch from './Neofetch'
import styles from './AboutSection.module.css'

function AboutSection() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.sectionMeta}><span>01 / PERFIL</span><span>UN POCO SOBRE MÍ</span></div>
      <div className={styles.aboutGrid}>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>SOBRE MÍ</p>
          <h2 id="about-title">Software pensado<br />para <em>resolver.</em></h2>
          <p>
            Mi formación en Ingeniería en Sistemas Computacionales guía mi manera de abordar el desarrollo: entender el problema y construir soluciones claras.
          </p>
          <p>
            Me interesan el desarrollo Backend y Full Stack, especialmente los sistemas empresariales. Pongo atención en diseñar APIs claras, trabajar con bases de datos y crear aplicaciones que sean fáciles de mantener.
          </p>
          <div className={styles.focusLine}><span aria-hidden="true">✳</span> Backend · APIs · Datos · Sistemas empresariales</div>
        </div>
        <Neofetch />
      </div>
    </section>
  )
}

export default AboutSection
