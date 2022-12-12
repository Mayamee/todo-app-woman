import { FC, ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './Menu.module.scss'
import IconButton from '../UI/IconButton/IconButton'

interface IMenuProps {
  enterIcon: ReactNode
  enterIconSize: number
  children?: ReactNode
  roundedIcon?: boolean
  align: 'left' | 'right'
}

const Menu: FC<IMenuProps> = ({ enterIcon, enterIconSize, children, align, roundedIcon }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setIsMenuOpen(false))
  return (
    <div ref={menuRef} className={styles['dropdown_menu']}>
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
