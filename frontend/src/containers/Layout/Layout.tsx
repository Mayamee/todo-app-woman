import { FC, ReactNode, useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import ToolBar from '../../components/ToolBar/ToolBar'
import Container from '../Container/Container'
import styles from './Layout.module.scss'
import Plug from '../../components/shared//Plug/Plug'
import { HEADER_HEIGHT } from '../../constants/Static'
import { AuthPopup } from '../../components/AuthPopup/AuthPopup'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { refreshToken } from '../../redux/ActionCreators/AuthCreators'
interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { scrollY } = useScroll()
  const [isScrolling, setScrolling] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('Layout.tsx useEffect')
      dispatch(refreshToken())
    }
  }, [])
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
      <header
        className={`${styles.header} ${isScrolling ? styles['header-scroll'] : ''}`}
        style={{
          height: HEADER_HEIGHT,
        }}
      >
        <Container fluid>
          <ToolBar />
        </Container>
      </header>
      <Plug height={HEADER_HEIGHT} />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
      <footer className={styles.footer}>
        <Container fluid>Some footer content</Container>
      </footer>
      {!isAuth && <AuthPopup />}
    </div>
  )
}

export default Layout
