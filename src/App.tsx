import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import CurrentlySection from './CurrentlySection'
import ExtrasSection from './ExtrasSection'
import PortfolioFooter from './PortfolioFooter'
import ProjectDialog, { type ProjectDialogHandle } from './ProjectDialog'
import ProjectsSection, { type OpenProject } from './ProjectsSection'
import SkillsSection from './SkillsSection'
import portrait from './assets/cristian-pixel-art-transparente.webp'
import styles from './App.module.css'

function scrollProgress(position: number, start: number, end: number) {
  const progress = Math.max(0, Math.min(1, (start - position) / (start - end)))
  return progress * progress * (3 - 2 * progress)
}

function getSectionHeading(target: HTMLElement) {
  return target.matches('h1, h2') ? target : target.querySelector<HTMLElement>('h1, h2')
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const projectDialogRef = useRef<ProjectDialogHandle>(null)
  const openProject: OpenProject = (project, trigger) => projectDialogRef.current?.open(project, trigger)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const root = document.documentElement
    const update = () => root.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`)
    const resize = new ResizeObserver(update)
    update()
    resize.observe(header)

    let frame = 0
    const alignFragment = (event?: HashChangeEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1))
        if (!target) return
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
        if (event) getSectionHeading(target)?.focus({ preventScroll: true })
      })
    }
    alignFragment()
    window.addEventListener('hashchange', alignFragment)
    return () => {
      resize.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', alignFragment)
      root.style.removeProperty('--site-header-height')
    }
  }, [])

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
    const root = document.documentElement
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const stops = sections.map(section => ({
      id: section.id,
      start: section.matches('#home, #contact') ? section : section.firstElementChild ?? section,
    }))
    const gallery = galleryRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previousSection = ''
    const update = () => {
      frame = 0
      const distance = root.scrollHeight - window.innerHeight
      const atBottom = distance > 0 && window.scrollY >= distance - 1
      const marker = parseFloat(getComputedStyle(root).scrollPaddingBlockStart) + 2
      const current = atBottom
        ? stops.at(-1)
        : stops.findLast(stop => stop.start.getBoundingClientRect().top <= marker)
      const id = current?.id ?? 'home'
      if (!reducedMotion.matches && gallery) {
        const height = window.innerHeight
        const arrival = scrollProgress(gallery.getBoundingClientRect().top, height * .96, height * .48)
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

  const closeMenu = () => setMenuOpen(false)
  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (menuOpen && event.key === 'Escape') {
      closeMenu()
      menuButtonRef.current?.focus({ preventScroll: true })
    }
  }
  const handleSectionNavigation = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
    if (!link) return

    const target = document.getElementById(link.hash.slice(1))
    const heading = target && getSectionHeading(target)
    closeMenu()
    window.requestAnimationFrame(() => heading?.focus({ preventScroll: true }))
  }

  return (
    <div className={styles.siteShell} onClick={handleSectionNavigation}>
      <a className={styles.skipLink} href="#hero-title">Saltar al contenido principal</a>
      <header className={styles.topHeader} ref={headerRef} onKeyDown={handleMenuKeyDown}>
        <a className={styles.logo} href="#home" aria-label="Cristian Medina, inicio">cristian<span>.dev</span></a>
        <button className={styles.menuButton} type="button" ref={menuButtonRef} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Cerrar' : 'Menú'}</span>
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} aria-hidden="true"><i /><i /></span>
        </button>
        <nav className={`${styles.topNav} ${menuOpen ? styles.topNavOpen : ''}`} id="main-navigation" aria-label="Navegación principal">
          {[
            ['home', 'Inicio'], ['projects', 'Proyectos'],
            ['about', 'Sobre mí'], ['extras', 'Extras'], ['skills', 'Tecnologías'],
            ['currently', 'Actualmente'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
          ))}
          <a className={styles.mobileContact} href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>Contacto</a>
        </nav>
        <a className={styles.contactAction} href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>Contacto <span aria-hidden="true">↗</span></a>
      </header>
      <main className={styles.main} id="main-content">
        <section className={styles.hero} id="home" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <div className={styles.heroIntro}>
              <div>
                <div className={styles.eyebrow}><span /> MÉRIDA, YUCATÁN</div>
                <h1 id="hero-title" tabIndex={-1}>Cristian<br /><em>Medina</em></h1>
              </div>
              <img className={styles.heroPortrait} src={portrait} alt="Cristian Medina en pixel art" width={1254} height={1254} />
            </div>
            <p className={styles.role}>Software Developer <span>|</span> Backend &amp; Full Stack</p>
            <p className={styles.description}>
              Diseño APIs y desarrollo aplicaciones web y de escritorio para gestionar tareas, pedidos e inventario.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#projects">Explorar proyectos <span aria-hidden="true">↓</span></a>
              <a className={styles.github} href="https://github.com/CMedina02" target="_blank" rel="noreferrer">
                <span>GitHub</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <div data-reveal className={styles.galleryArrival} ref={galleryRef}><ProjectsSection onOpen={openProject} /></div>
        <div data-reveal><AboutSection /></div>
        <div data-reveal><ExtrasSection /></div>
        <div data-reveal><SkillsSection /></div>
        <div data-reveal><CurrentlySection /></div>
        <div className={styles.closing}>
          <ContactSection />
          <PortfolioFooter />
        </div>
      </main>
      <ProjectDialog ref={projectDialogRef} />
    </div>
  )
}

export default App
