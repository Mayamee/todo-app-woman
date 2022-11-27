import { FC } from 'react'
import styles from './ToolBar.module.scss'
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg'
import SvgContainer from '../../containers/SvgContainer/SvgContainer'

interface IToolBarProps {}

const ToolBar: FC<IToolBarProps> = () => {
  return (
    <div className={styles['toolbar-body']}>
      <div className={styles['toolbar-body-menuButton']}>Menu</div>
      <div className={styles['toolbar-body-logo']}>
        <SvgContainer size={50} icon={<LogoIcon />} />
      </div>
      <div className={styles['toolbar-body-search']}>Search</div>
      <div className={styles['toolbar-body-avatar']}>Avatar</div>
    </div>
  )
}
export default ToolBar
