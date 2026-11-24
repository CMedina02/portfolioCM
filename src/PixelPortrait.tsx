import { useLayoutEffect, useRef, useState } from 'react'
import portrait from './assets/cristian-pixel-art-transparente.webp'
import styles from './PixelPortrait.module.css'

export default function PixelPortrait() {
  const [ready, setReady] = useState(false)
  const [greeting, setGreeting] = useState(0)
  const portraitRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (!greeting) return

    let current = true
    const animations = portraitRef.current?.getAnimations({ subtree: true }) ?? []
    for (const animation of animations) {
      animation.currentTime = 0
      animation.play()
    }
    void Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (current) setGreeting(0)
    })

    return () => { current = false }
  }, [greeting])

  return (
    <button className={styles.portrait} ref={portraitRef} type="button" aria-label="Saludar a Cristian Medina en pixel art"
      data-ready={ready || undefined} data-greeting={greeting > 0 || undefined} onClick={() => setGreeting(count => count + 1)}>
      <span className={styles.shadow} aria-hidden="true" />
      <span className={styles.motion} aria-hidden="true">
        <span className={styles.sprite}>
          <img src={portrait} width={1254} height={1254} alt="" onLoad={() => setReady(true)} />
          <span className={styles.eyelids} />
        </span>
      </span>
      <span className={styles.sparkles} aria-hidden="true" />
    </button>
  )
}
