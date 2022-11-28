import { FC, ReactNode, useEffect, useId, useState } from 'react'
import styles from './Menu.module.scss'
import hasParentId from '../../utils/DOM/hasParentId'
import IconButton from '../UI/IconButton/IconButton'

interface IMenuProps {
  enterIcon: ReactNode
  enterIconSize: number
  children?: ReactNode
  align: 'left' | 'right'
}

const Menu: FC<IMenuProps> = ({ enterIcon, enterIconSize, children, align }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownId = useId()
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement
      !hasParentId(clickedElement, dropdownId) && setIsMenuOpen(false)
    }
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])
  return (
    <div id={dropdownId} className={styles['dropdown_menu']}>
      <IconButton
        size={enterIconSize}
        icon={enterIcon}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
      <ul
        style={{
          opacity: isMenuOpen ? '1' : '0',
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'all' : 'none',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
        }}
        className={`${styles['dropdown_menu-body']} ${
          align === 'right' ? styles['dropdown_menu-body-right'] : ''
        }`}
      >
        {children}
      </ul>
    </div>
  )
}

export default Menu
