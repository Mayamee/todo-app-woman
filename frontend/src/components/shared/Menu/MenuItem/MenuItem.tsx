import { FC, MouseEvent, ReactNode } from 'react'
import SvgContainer from '../../UI/SvgContainer/SvgContainer'
import styles from './MenuItem.module.scss'

interface IMenuItemProps {
  inconSize?: string
  icon?: ReactNode
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLLIElement>) => void
}

const MenuItem: FC<IMenuItemProps> = ({ icon, inconSize, children, onClick }) => (
  <li className={styles['dropdown-item']} onClick={onClick}>
    {icon && inconSize && (
      <div className={styles['dropdown-item-icon']}>
        <SvgContainer size={inconSize} icon={icon} />
      </div>
    )}
    <span className={styles['dropdown-item-content']}>{children}</span>
  </li>
)

export default MenuItem
