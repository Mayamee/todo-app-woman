import { ChangeEvent, FC, useState } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/images/burger.svg'
import TemplateAvatar from '../../assets/images/template.jpg'
import { ReactComponent as AllIcon } from '../../assets/images/all.svg'
import { ReactComponent as ArchiveIcon } from '../../assets/images/archive.svg'
import { ReactComponent as LogoutIcon } from '../../assets/images/logout.svg'
import Logo from '../Logo/Logo'
import { Search } from '../shared/UI/Search/Search'
import Menu from '../shared/Menu/Menu'
import MenuItem from '../shared/Menu/MenuItem/MenuItem'
import { TOOLBAR_MENU_ITEM_ICON_SIZE } from '../../constants/Static'
import useMediaQuery from '../../hooks/useMediaQuery'
import MediaQueries from '../../constants/MediaQueries'

const ToolBar: FC<unknown> = () => {
  const [, setSearchValue] = useState('')
  const isBigPhone = useMediaQuery(MediaQueries.bigPhone)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>
        <Menu enterIconSize={30} enterIcon={<MenuIcon />} align="right">
          {isBigPhone && <MenuItem>some user</MenuItem>}
          <MenuItem icon={<AllIcon />} inconSize={TOOLBAR_MENU_ITEM_ICON_SIZE}>
            Todos
          </MenuItem>
          <MenuItem icon={<ArchiveIcon />} inconSize={TOOLBAR_MENU_ITEM_ICON_SIZE}>
            Archive
          </MenuItem>
          {isBigPhone && (
            <MenuItem icon={<LogoutIcon />} inconSize={TOOLBAR_MENU_ITEM_ICON_SIZE}>
              Logout
            </MenuItem>
          )}
        </Menu>
      </div>
      <div className={styles['toolbar-body-logo']}>
        <Logo />
      </div>
      <div className={styles['toolbar-body-search']}>
        <Search placeholder="Search" onChange={handleSearchChange.bind(null)} />
      </div>
      <div className={styles['toolbar-body-avatar']}>
        <Menu
          enterIcon={<img src={TemplateAvatar} alt="Avatar" />}
          enterIconSize={40}
          roundedIcon
          align="left"
        >
          <MenuItem>some user</MenuItem>
          <MenuItem icon={<LogoutIcon />} inconSize={TOOLBAR_MENU_ITEM_ICON_SIZE}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
export default ToolBar
