import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import CurrentlySection from './CurrentlySection'
import OtherProjectsSection from './OtherProjectsSection'
import PortfolioFooter from './PortfolioFooter'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import styles from './App.module.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    const desktopQuery = window.matchMedia('(min-width: 1100px)')

    document.addEventListener('pointerdown', closeOnOutsidePress)
    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      desktopQuery.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    if (!('IntersectionObserver' in window)) return
    const updateActive = () => {
      const marker = window.innerHeight * 0.3
      const current = sections.filter((section) => section.getBoundingClientRect().top <= marker).at(-1)
      setActiveSection(current?.id ?? 'home')
    }
    const observer = new IntersectionObserver(updateActive, { rootMargin: '-30% 0px -69% 0px' })
    sections.forEach((section) => observer.observe(section))
    updateActive()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = document.querySelectorAll<HTMLElement>('[data-reveal], [data-project-card]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    items.forEach((item) => {
      if (item.getBoundingClientRect().top >= window.innerHeight) {
        item.classList.add(styles.revealPending)
        observer.observe(item)
      }
    })
    return () => { observer.disconnect(); items.forEach((item) => item.classList.remove(styles.revealPending, styles.revealed)) }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      closeMenu()
      menuButtonRef.current?.focus({ preventScroll: true })
    }
  }
  const handleMobileNavigation = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href')
    closeMenu()

    if (href?.startsWith('#')) {
      const target = document.getElementById(href.slice(1))
      const heading = target?.querySelector<HTMLElement>('h1, h2')
      window.requestAnimationFrame(() => heading?.focus({ preventScroll: true }))
    } else {
      menuButtonRef.current?.focus({ preventScroll: true })
    }
  }

  return (
    <div className={styles.siteShell}>
      <a className={styles.skipLink} href="#hero-title">Saltar al contenido principal</a>
      <header className={styles.topHeader} ref={headerRef} onKeyDown={handleMenuKeyDown}>
        <a className={styles.logo} href="#home" onClick={closeMenu} aria-label="Cristian Medina, inicio">CM<span> / PORTFOLIO</span></a>
        <button className={styles.menuButton} type="button" ref={menuButtonRef} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Cerrar' : 'Menú'}</span>
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} aria-hidden="true"><i /><i /></span>
        </button>
        <nav className={`${styles.topNav} ${menuOpen ? styles.topNavOpen : ''}`} id="main-navigation" aria-label="Navegación principal">
          {[
            ['home', 'Inicio'], ['about', 'Sobre mí'], ['skills', 'Tecnologías'],
            ['projects', 'Proyectos'], ['other-projects', 'Otros proyectos'],
            ['currently', 'Actualmente'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={handleMobileNavigation}>{label}</a>
          ))}
          <a className={styles.mobileContact} href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={handleMobileNavigation}>Contacto</a>
        </nav>
        <a className={styles.contactAction} href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={handleMobileNavigation}>Contacto <span aria-hidden="true">↗</span></a>
      </header>
      <main className={styles.main} id="main-content">
        <section className={styles.hero} id="home" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> PERFIL · DESARROLLO DE SOFTWARE</div>
            <p className={styles.intro}>Hola, soy</p>
            <h1 id="hero-title" tabIndex={-1}>Cristian<br /><em>Medina.</em></h1>
            <p className={styles.role}>Software Developer <span>|</span> Backend &amp; Full Stack</p>
            <p className={styles.description}>
              Desarrollo aplicaciones Backend, soluciones Full Stack y sistemas empresariales. Me interesa crear software claro, útil y bien estructurado.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
                <span>Visita mi GitHub</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.heroIndex}><span>01 — 07</span><span>SCROLL TO EXPLORE</span></div>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualHeading}><span>ESPACIO DE TRABAJO</span><span>FIG. 01</span></div>
            <div className={styles.deskScene} role="img" aria-label="Ilustración de un escritorio de desarrollo con una terminal Linux y Tux">
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
            <div className={styles.visualCaption}><span>ENTORNO DE TRABAJO</span><span>LINUX · TERMINAL · TUX</span></div>
          </div>
        </section>

        <div data-reveal><AboutSection /></div>
        <div data-reveal><SkillsSection /></div>
        <div data-reveal><ProjectsSection /></div>
        <div data-reveal><OtherProjectsSection /></div>
        <div data-reveal><CurrentlySection /></div>
        <div data-reveal><ContactSection /></div>
        <PortfolioFooter />
      </main>
    </div>
  )
}

export default App
