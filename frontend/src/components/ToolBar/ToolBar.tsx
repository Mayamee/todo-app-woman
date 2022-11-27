import { FC } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/images/burger.svg'
import IconButton from '../IconButton/IconButton'
import Logo from '../Logo/Logo'

interface IToolBarProps {}

const ToolBar: FC<IToolBarProps> = () => {
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>
        <IconButton size={25} icon={<MenuIcon />} />
      </div>
      <div className={styles['toolbar-body-logo']}>
        <Logo />
      </div>
      <div className={styles['toolbar-body-search']}>Search</div>
      <div className={styles['toolbar-body-avatar']}>Avatar</div>
    </div>
  )
}
export default ToolBar
