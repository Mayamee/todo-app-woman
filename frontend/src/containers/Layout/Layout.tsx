import { FC, ReactNode, useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import ToolBar from '../../components/ToolBar/ToolBar'
import Container from '../Container/Container'
import styles from './Layout.module.scss'
interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const { scrollY } = useScroll()
  const [isScrolling, setScrolling] = useState(false)
  useEffect(() => {
    return scrollY.onChange((offsetY) => {
      if (offsetY === 0) {
        setScrolling(false)
      } else if (!isScrolling) {
        setScrolling(true)
      }
    })
  }, [])
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Container fluid>
          <ToolBar />
        </Container>
      </header>
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
      <footer className={styles.footer}>
        <Container fluid>Some footer content</Container>
      </footer>
    </div>
  )
}

export default Layout
