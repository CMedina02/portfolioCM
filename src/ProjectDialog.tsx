import { useImperativeHandle, useRef, useState, type PointerEvent, type Ref } from 'react'
import { flushSync } from 'react-dom'
import { ProjectDetails, ProjectMedia, type OpenProject } from './ProjectsSection'
import { projects } from './data/projects'
import styles from './ProjectDialog.module.css'

export type ProjectDialogHandle = { open: OpenProject }

export default function ProjectDialog({ ref }: { ref: Ref<ProjectDialogHandle> }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const backdropPress = useRef<number | null>(null)
  const swipeStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const [{ index, direction }, setSelection] = useState({ index: 0, direction: 0 })
  const project = projects[index]

  useImperativeHandle(ref, () => ({
    open(project, trigger) {
      const dialog = dialogRef.current
      if (!dialog || dialog.open) return

      const index = projects.indexOf(project)
      if (index < 0) return
      trigger.focus({ preventScroll: true })
      flushSync(() => setSelection({ index, direction: 0 }))
      dialog.showModal()
      closeRef.current?.focus({ preventScroll: true })
      bodyRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    },
  }), [])

  function step(direction: -1 | 1) {
    if (dialogRef.current?.hasAttribute('data-closing')) return
    setSelection(current => ({
      index: (current.index + direction + projects.length) % projects.length,
      direction,
    }))
    bodyRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  async function close() {
    const dialog = dialogRef.current
    if (!dialog?.open || dialog.hasAttribute('data-closing')) return

    if (!CSS.supports('overlay', 'auto')) {
      // Keep the dialog in the top layer until the fallback transition ends.
      dialog.setAttribute('data-closing', '')
      await Promise.allSettled(dialog.getAnimations().map(animation => animation.finished))
    }

    dialog.close()
    dialog.removeAttribute('data-closing')
  }

  function isBackdrop(event: PointerEvent<HTMLDialogElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    return event.target === event.currentTarget && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    )
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} closedby="any" aria-labelledby="project-dialog-title"
      onCancel={event => {
        event.preventDefault()
        void close()
      }}
      onPointerDown={event => {
        if (!('closedBy' in event.currentTarget) && isBackdrop(event)) backdropPress.current = event.pointerId
      }}
      onPointerUp={event => {
        if (backdropPress.current === event.pointerId && isBackdrop(event)) void close()
        backdropPress.current = null
      }}
      onPointerCancel={() => { backdropPress.current = null }}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          step(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
      <header className={styles.toolbar}>
        <p aria-live="polite" aria-atomic="true">
          <span className={styles.srOnly}>{project.name}. Proyecto </span>
          {String(index + 1).padStart(2, '0')} <span aria-hidden="true">/</span>
          <span className={styles.srOnly}> de </span> {String(projects.length).padStart(2, '0')}
        </p>
        <button ref={closeRef} className={styles.closeButton} type="button" onClick={() => void close()}>
          Cerrar <span aria-hidden="true">×</span>
        </button>
      </header>
      <div ref={bodyRef} className={styles.body}
        onPointerDown={event => {
          if (event.pointerType !== 'touch' || !event.isPrimary ||
            (event.target instanceof Element && event.target.closest('a, button, summary'))) return
          swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        }}
        onPointerUp={event => {
          const start = swipeStart.current
          swipeStart.current = null
          if (start?.id !== event.pointerId) return
          const x = event.clientX - start.x
          const y = event.clientY - start.y
          if (Math.abs(x) >= 60 && Math.abs(x) > Math.abs(y) * 1.5) step(x < 0 ? 1 : -1)
        }}
        onPointerCancel={() => { swipeStart.current = null }}>
        <div key={project.id} className={styles.slide} data-direction={direction}>
          <header className={styles.heading}>
            {project.context && <p>{project.context}</p>}
            <h2 id="project-dialog-title">{project.name}</h2>
          </header>
          <ProjectMedia project={project} />
          <p className={styles.description}>{project.description}</p>
          <ul className={styles.highlights}>
            {project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
          </ul>
          <ProjectDetails project={project} />
        </div>
      </div>
      <footer className={styles.navigation} aria-label="Navegación entre proyectos">
        <button type="button" onClick={() => step(-1)}><span aria-hidden="true">←</span> Anterior</button>
        <button type="button" onClick={() => step(1)}>Siguiente <span aria-hidden="true">→</span></button>
      </footer>
    </dialog>
  )
}
