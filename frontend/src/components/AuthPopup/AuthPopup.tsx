import { FC } from 'react'
import styles from './AuthPopup.module.scss'
import { ReactComponent as BgImage } from '../../assets/images/bg-auth.svg'

interface IAuthPopup {}

export const AuthPopup: FC<IAuthPopup> = () => {
  return (
    <div className={styles['popup-wrapper']}>
      <div className={styles['popup-bg-frame']}>
        <BgImage />
      </div>
      <div className={styles['popup']}>
        <div className={styles['popup-body']}>
          <div className="popup-title">Title</div>
          <form
            className="popup-form"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            form
          </form>
        </div>
      </div>
    </div>
  )
}
