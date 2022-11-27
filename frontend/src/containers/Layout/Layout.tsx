import { FC, ReactNode } from 'react'
import ToolBar from '../../components/ToolBar/ToolBar'
import Container from '../Container/Container'
import styles from './Layout.module.scss'
interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <ToolBar />
      </header>
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
      <footer className={styles.footer}>Some footer content</footer>
    </div>
  )
}

export default Layout
