import { useState } from 'react'
import AboutSection from './AboutSection'
import styles from './App.module.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={styles.siteShell}>
      <aside className={styles.sidebar} aria-label="Navegación principal">
        <a className={styles.brand} href="#home" onClick={closeMenu} aria-label="Cristian Medina, inicio">
          <span className={styles.brandMark}>CM</span>
          <span className={styles.brandCaption}>Portfolio<br />2026</span>
        </a>

        <div className={styles.sidebarRule} />
        <p className={styles.navLabel}>Índice</p>
        <nav className={styles.desktopNav}>
          <a className={styles.navLink} href="#home" aria-current="page">
            <span className={styles.navNumber}>01</span> Inicio
          </a>
          <a className={styles.navLink} href="#about">
            <span className={styles.navNumber}>02</span> Sobre mí
          </a>
          <a className={styles.navLink} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
            <span className={styles.navNumber}>↗</span> GitHub
          </a>
        </nav>

        <div className={styles.sidebarBottom}>
          <span className={styles.availabilityDot} aria-hidden="true" />
          <p>Backend &amp; Full Stack<br />Software Developer</p>
          <span className={styles.sidebarEdition}>MÉRIDA · MX</span>
        </div>
      </aside>

      <main className={styles.main} id="home">
        <header className={styles.mobileHeader}>
          <a className={styles.mobileBrand} href="#home" onClick={closeMenu}>CM<span> / PORTFOLIO</span></a>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Cerrar' : 'Menú'}</span>
            <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} aria-hidden="true"><i /><i /></span>
          </button>
          <nav className={styles.mobileNav} id="mobile-navigation" aria-label="Navegación móvil" hidden={!menuOpen}>
            <a href="#home" onClick={closeMenu}>Inicio <span>01</span></a>
            <a href="#about" onClick={closeMenu}>Sobre mí <span>02</span></a>
            <a href="https://github.com/CMedina02" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <span>↗</span></a>
          </nav>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> PERFIL · DESARROLLO DE SOFTWARE</div>
            <p className={styles.intro}>Hola, soy</p>
            <h1 id="hero-title">Cristian<br /><em>Medina.</em></h1>
            <p className={styles.role}>Software Developer <span>|</span> Backend &amp; Full Stack</p>
            <p className={styles.description}>
              Desarrollo aplicaciones Backend, soluciones Full Stack y sistemas empresariales. Me interesa crear software claro, útil y bien estructurado.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
                <span>Visita mi GitHub</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.heroIndex}><span>01 — 01</span><span>SCROLL TO EXPLORE</span></div>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualHeading}><span>ESPACIO DE TRABAJO</span><span>FIG. 01</span></div>
            <div className={styles.deskScene} role="img" aria-label="Espacio reservado para una ilustración de escritorio con Tux">
              <div className={styles.sceneTopline}><span>SYS / USER</span><span>~</span></div>
              <div className={styles.monitor}>
                <div className={styles.monitorFrame}>
                  <div className={styles.screenTop}><span>● ● ●</span><span>neofetch</span></div>
                  <div className={styles.screenContent}>
                    <div className={styles.tuxMark} aria-hidden="true">🐧</div>
                    <div className={styles.terminalLines} aria-hidden="true">
                      <b>cristian@portfolio</b><span>------------------</span>
                      <span>OS: Linux</span><span>Role: Developer</span><span>Focus: Backend</span><span>Stack: Full Stack</span>
                      <i>▌</i>
                    </div>
                  </div>
                </div>
                <div className={styles.monitorStand} />
                <div className={styles.monitorBase} />
              </div>
              <div className={styles.deskObjects} aria-hidden="true">
                <div className={styles.plant}><i /><i /><i /><b /></div>
                <div className={styles.notebook}><span>NOTES</span><i /></div>
                <div className={styles.cup}><i /></div>
              </div>
              <div className={styles.deskSurface} />
              <span className={styles.sceneCaption}>Una mesa para construir<br />cosas que importan.</span>
            </div>
            <div className={styles.visualCaption}><span>ENTORNO DE TRABAJO</span><span>ILUSTRACIÓN EDITABLE</span></div>
          </div>
        </section>

        <AboutSection />

        <footer className={styles.footer}>
          <span>CRISTIAN MEDINA <i>·</i> SOFTWARE DEVELOPER</span>
          <span>IVORY &amp; FOREST <i>·</i> 2026</span>
        </footer>
      </main>
    </div>
  )
}

export default App
