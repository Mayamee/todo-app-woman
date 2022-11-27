import { FC } from 'react'
import styles from './ToolBar.module.scss'

interface IToolBarProps {}

const ToolBar: FC<IToolBarProps> = () => {
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>Menu</div>
      <div className={styles['toolbar-body-logo']}>Logo</div>
      <div className={styles['toolbar-body-search']}>Search</div>
      <div className={styles['toolbar-body-avatar']}>Avatar</div>
    </div>
  )
}
export default ToolBar
