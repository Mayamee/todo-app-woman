import { FC, ReactNode } from 'react'
import styles from './Container.module.scss'
interface IConatinerProps {
  children: ReactNode
}
const Container: FC<IConatinerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}
export default Container
