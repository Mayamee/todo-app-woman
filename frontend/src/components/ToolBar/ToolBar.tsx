import { FC } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/images/burger.svg'
import TemplateAvatar from '../../assets/images/template.jpg'
import IconButton from '../IconButton/IconButton'
import Logo from '../Logo/Logo'
import Avatar from '../Avatar/Avatar'

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
      <div className={styles['toolbar-body-avatar']}>
        <Avatar size={40} image={TemplateAvatar} rounded />
      </div>
    </div>
  )
}
export default ToolBar
