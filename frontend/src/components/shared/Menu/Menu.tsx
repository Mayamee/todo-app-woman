import { FC, ReactNode, useEffect, useId, useState } from 'react'
import styles from './Menu.module.scss'
import IconButton from '../UI/IconButton/IconButton'

interface IMenuProps {
  enterIcon: ReactNode
  enterIconSize: number
  children?: ReactNode
  roundedIcon?: boolean
  align: 'left' | 'right'
}

const hasParentId = (node: HTMLElement, id: string) => {
  while (true) {
    if (node.id === id) {
      return true
    }
    if (!node.parentNode) return false
    node = node.parentNode as HTMLElement
  }
}

const Menu: FC<IMenuProps> = ({ enterIcon, enterIconSize, children, align, roundedIcon }) => {
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
        rounded={roundedIcon}
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
