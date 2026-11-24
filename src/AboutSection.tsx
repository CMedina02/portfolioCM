import Neofetch from './Neofetch'
import styles from './AboutSection.module.css'

function AboutSection() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.aboutGrid}>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>SOBRE MÍ</p>
          <h2 id="about-title" tabIndex={-1}>Software pensado<br />para <em>resolver</em></h2>
          <p>
            Mi formación guía mi manera de abordar el desarrollo. Primero busco entender el problema y después construyo una solución clara.
          </p>
          <div className={styles.education}>
            <p><strong>Instituto Tecnológico de Mérida</strong></p>
            <p>Ingeniería en Sistemas Computacionales</p>
            <p><time dateTime="2022">2022</time> – <time dateTime="2027">2027</time> · Egreso previsto</p>
          </div>
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
