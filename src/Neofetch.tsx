import styles from './Neofetch.module.css'

const profile = [
  ['Name', 'Cristian Medina'],
  ['Specialty', 'Backend & Full Stack'],
  ['Location', 'Mérida, MX'],
  ['Interests', 'APIs · Databases'],
  ['', 'Enterprise systems'],
  ['', 'Maintainable applications'],
]

function Neofetch() {
  return (
    <figure className={styles.terminal} aria-labelledby="neofetch-title">
      <figcaption className={styles.terminalBar} id="neofetch-title">
        <span><i aria-hidden="true" /> profile — neofetch</span>
        <span>● ● ●</span>
      </figcaption>
      <div className={styles.terminalBody}>
        <pre className={styles.tux} aria-hidden="true">{`       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/` + '`' + `\\
   \\___)=(___/`}</pre>
        <dl className={styles.profile}>
          {profile.map(([label, value], index) => (
            <div className={styles.profileRow} key={`${label}-${value}`}>
              {label && <dt>{label}</dt>}
              <dd className={!label ? styles.continuation : undefined}>{value}</dd>
              {index === 0 && <span className={styles.rule} aria-hidden="true" />}
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.terminalFoot}><span>LINUX-INSPIRED PROFILE</span><span>INFORMATIVE · NOT INTERACTIVE</span></div>
    </figure>
  )
}

export default Neofetch
