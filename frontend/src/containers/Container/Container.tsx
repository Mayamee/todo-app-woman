import { FC, ReactNode } from 'react'
import styles from './Container.module.scss'
interface IConatinerProps {
  children: ReactNode
  fluid?: boolean
}
const Container: FC<IConatinerProps> = ({ children, fluid = false }) => {
  const containerClass = fluid ? styles['container-fluid'] : styles['container-static']
  return <div className={`${styles['container']} ${containerClass}`}>{children}</div>
}
export default Container
