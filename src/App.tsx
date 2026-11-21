import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import MissionPreview from './MissionPreview'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import CurrentlySection from './CurrentlySection'
import OtherProjectsSection from './OtherProjectsSection'
import PortfolioFooter from './PortfolioFooter'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import styles from './App.module.css'

function scrollProgress(position: number, start: number, end: number) {
  const progress = Math.max(0, Math.min(1, (start - position) / (start - end)))
  return progress * progress * (3 - 2 * progress)
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

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
    const mission = missionRef.current
    const gallery = galleryRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previousSection = ''
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const atBottom = distance > 0 && window.scrollY >= distance - 1
      const marker = window.innerHeight * .32
      const current = atBottom
        ? sections.at(-1)
        : sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1)
      const id = current?.id ?? 'home'
      if (!reducedMotion.matches && mission && gallery) {
        const height = window.innerHeight
        const missionBounds = mission.getBoundingClientRect()
        const center = missionBounds.top + missionBounds.height / 2
        const departure = scrollProgress(center, height * .52, height * .12)
        const arrival = scrollProgress(gallery.getBoundingClientRect().top, height * .96, height * .48)
        mission.style.setProperty('--departure', String(departure))
        gallery.style.setProperty('--arrival', String(arrival))
      }
      if (id !== previousSection) {
        previousSection = id
        setActiveSection(id)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', schedule)
      resize.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (CSS.supports('animation-timeline: view()') || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.toggleAttribute('data-in-view', entry.isIntersecting)
      }
    })
    document.querySelectorAll('[data-reveal], [data-project-card]').forEach(panel => observer.observe(panel))
    return () => observer.disconnect()
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
        <a className={styles.logo} href="#home" onClick={closeMenu} aria-label="Cristian Medina, inicio">cristian<span>.dev</span></a>
        <button className={styles.menuButton} type="button" ref={menuButtonRef} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Cerrar' : 'Menú'}</span>
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} aria-hidden="true"><i /><i /></span>
        </button>
        <nav className={`${styles.topNav} ${menuOpen ? styles.topNavOpen : ''}`} id="main-navigation" aria-label="Navegación principal">
          {[
            ['home', 'Inicio'], ['projects', 'Proyectos'], ['other-projects', 'Otros proyectos'],
            ['about', 'Sobre mí'], ['skills', 'Tecnologías'],
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
            <div className={styles.eyebrow}><span /> MÉRIDA, YUCATÁN</div>
            <h1 id="hero-title" tabIndex={-1}>Cristian<br /><em>Medina.</em></h1>
            <p className={styles.role}>Software Developer <span>|</span> Backend &amp; Full Stack</p>
            <p className={styles.description}>
              Diseño APIs y aplicaciones para resolver problemas concretos, desde gestionar una caja hasta trazar rutas sobre Marte.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#projects">Explorar proyectos <span aria-hidden="true">↓</span></a>
              <a className={styles.github} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
                <span>GitHub</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className={styles.missionFrame} ref={missionRef}>
            <MissionPreview />
          </div>
        </section>

        <div data-reveal className={styles.galleryArrival} ref={galleryRef}><ProjectsSection /></div>
        <div data-reveal><OtherProjectsSection /></div>
        <div data-reveal><AboutSection /></div>
        <div data-reveal><SkillsSection /></div>
        <div data-reveal><CurrentlySection /></div>
        <div data-reveal><ContactSection /></div>
        <PortfolioFooter />
      </main>
    </div>
  )
}

export default App
