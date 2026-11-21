import styles from './PortfolioFooter.module.css'

function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.name}>Cristian Medina</span>
        <span className={styles.role}>Software Developer | Backend &amp; Full Stack</span>
      </div>
      <p lang="en">Always learning. Always building.</p>
      <a className={styles.topLink} href="#home">Volver arriba <span aria-hidden="true">↑</span></a>
    </footer>
  )
}

export default PortfolioFooter
