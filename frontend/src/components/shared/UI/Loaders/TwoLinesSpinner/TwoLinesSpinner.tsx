import styles from './TwoLinesSpinner.module.scss'
const TwoLinesSpinner = () => {
  return (
    <div className={styles['spinner-double-ring']}>
      <div className={styles['spinner']}>
        <div />
        <div />
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </div>
    </div>
  )
}

export default TwoLinesSpinner
