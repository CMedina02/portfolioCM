import styles from './PortfolioFooter.module.css'

function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.name}>Cristian Medina</span>
        <span className={styles.role}>Software Developer | Backend &amp; Full Stack</span>
      </div>
      <p>Always learning. Always building.</p>
    </footer>
  )
}

export default PortfolioFooter
