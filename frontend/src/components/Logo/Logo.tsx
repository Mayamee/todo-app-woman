import { FC } from 'react'
import SvgContainer from '../shared/UI/SvgContainer/SvgContainer'
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg'
import styles from './Logo.module.scss'

interface ILogoProps {}
const Logo: FC<ILogoProps> = () => {
  return (
    <div className={styles['logo']}>
      <div className={styles['logo-icon']}>
        <SvgContainer size={40} icon={<LogoIcon />} />
      </div>
      <div className={styles['logo-text']}>Todo list</div>
    </div>
  )
}

export default Logo
