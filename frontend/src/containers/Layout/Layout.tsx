import { FC, ReactNode } from 'react'
import styles from './Layout.module.scss'
interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}></header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Some description content</footer>
    </div>
  )
}

export default Layout
