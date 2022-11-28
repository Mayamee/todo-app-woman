import { ChangeEvent, FC, useState } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/images/burger.svg'
import TemplateAvatar from '../../assets/images/template.jpg'
import IconButton from '../UI/IconButton/IconButton'
import Logo from '../Logo/Logo'
import Avatar from '../UI/Avatar/Avatar'
import { Search } from '../UI/Search/Search'

interface IToolBarProps {}

const ToolBar: FC<IToolBarProps> = () => {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>
        <IconButton size={25} icon={<MenuIcon />} />
      </div>
      <div className={styles['toolbar-body-logo']}>
        <Logo />
      </div>
      <div className={styles['toolbar-body-search']}>
        <Search placeholder="Search" onChange={handleSearchChange.bind(null)} />
      </div>
      <div className={styles['toolbar-body-avatar']}>
        <Avatar size={40} image={TemplateAvatar} rounded />
      </div>
    </div>
  )
}
export default ToolBar
