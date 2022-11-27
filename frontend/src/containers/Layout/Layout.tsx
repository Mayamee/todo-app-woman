import { FC, ReactNode } from 'react'
import Container from '../Container/Container'
import styles from './Layout.module.scss'
interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Container>Some header content</Container>
      </header>
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
      <footer className={styles.footer}>
        <Container>Some footer content</Container>
      </footer>
    </div>
  )
}

export default Layout
