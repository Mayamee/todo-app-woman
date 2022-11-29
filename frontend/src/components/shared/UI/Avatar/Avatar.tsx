import { FC } from 'react'
import styles from './Avatar.module.scss'
interface IAvatarProps {
  image: string
  rounded?: boolean
  size:
    | {
        width: number
        height: number
      }
    | number
}
const Avatar: FC<IAvatarProps> = ({ image, size, rounded }) => (
  <div
    className={styles['avatar-container']}
    style={{
      width: typeof size === 'number' ? size : size.width,
      height: typeof size === 'number' ? size : size.height,
    }}
  >
    <img src={image} alt="Avatar" className={rounded ? styles['rounded'] : ''} />
  </div>
)

export default Avatar
