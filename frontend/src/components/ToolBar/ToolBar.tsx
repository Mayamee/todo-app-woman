import { ChangeEvent, FC, useState } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/images/burger.svg'
import TemplateAvatar from '../../assets/images/template.jpg'
import { ReactComponent as AllIcon } from '../../assets/images/all.svg'
import { ReactComponent as ArchiveIcon } from '../../assets/images/archive.svg'
import Logo from '../Logo/Logo'
import Avatar from '../UI/Avatar/Avatar'
import { Search } from '../UI/Search/Search'
import Menu from '../Menu/Menu'
import MenuItem from '../Menu/MenuItem/MenuItem'

interface IToolBarProps {}

const ToolBar: FC<IToolBarProps> = () => {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>
        <Menu enterIconSize={25} enterIcon={<MenuIcon />} align="right">
          <MenuItem icon={<AllIcon />} inconSize={25}>
            Todos
          </MenuItem>
          <MenuItem icon={<ArchiveIcon />} inconSize={25}>
            Archive
          </MenuItem>
        </Menu>
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
