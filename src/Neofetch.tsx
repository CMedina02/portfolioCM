import { useState } from 'react'
import styles from './Neofetch.module.css'

const profile = [
  ['Name', 'Cristian Medina'],
  ['Specialty', 'Backend & Full Stack'],
  ['Location', 'Mérida, MX'],
  ['Interests', 'APIs · Databases'],
  ['', 'Enterprise systems'],
  ['', 'Maintainable applications'],
]

const commands = ['perfil', 'stack', 'proyectos'] as const
type Command = typeof commands[number]

function Neofetch() {
  const [command, setCommand] = useState<Command>('perfil')
  return (
    <figure className={styles.terminal} aria-labelledby="neofetch-title">
      <figcaption className={styles.terminalBar} id="neofetch-title">
        <span><i aria-hidden="true" /> cristian@portfolio — neofetch</span>
        <span>● ● ●</span>
      </figcaption>
      <div className={styles.commands} role="group" aria-label="Comandos del perfil">
        {commands.map(option => (
          <button key={option} type="button" aria-pressed={command === option}
            aria-controls="neofetch-output" onClick={() => setCommand(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className={styles.terminalBody} id="neofetch-output" aria-live="polite">
        <pre className={styles.tux} aria-hidden="true">{`       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\\
   \\___)=(___/`}</pre>
        {command === 'perfil' ? <dl className={styles.profile}>
          {profile.map(([label, value], index) => (
            <div className={styles.profileRow} key={`${label}-${value}`}>
              {label && <dt>{label}</dt>}
              <dd className={!label ? styles.continuation : undefined}>{value}</dd>
              {index === 0 && <span className={styles.rule} aria-hidden="true" />}
            </div>
          ))}
        </dl> : command === 'stack' ? (
          <div className={styles.output}>
            <p>APIs con FastAPI y Node.js. Interfaces con React y TypeScript. Datos en PostgreSQL y SQLite.</p>
            <a href="#skills">Ver tecnologías <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <div className={styles.output}>
            <p>MAPTE, KanbanProject y Pizzería Paco 2.0.</p>
            <a href="#projects">Explorar proyectos <span aria-hidden="true">→</span></a>
          </div>
        )}
      </div>
    </figure>
  )
}

export default Neofetch
