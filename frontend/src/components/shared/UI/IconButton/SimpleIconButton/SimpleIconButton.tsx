import { FC, MouseEvent, ReactNode } from 'react'
import styles from './SimpleIconButton.module.scss'

interface ISimpleIconButton {
  icon: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  size: number | { width: number; height: number }
  rounded?: boolean
  cursor?:
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'e-resize'
    | 'n-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'w-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'col-resize'
    | 'row-resize'
    | 'all-scroll'
    | 'zoom-in'
    | 'zoom-out'
    | 'grab'
    | 'grabbing'
}

export const SimpleIconButton: FC<ISimpleIconButton> = ({
  icon,
  size,
  rounded,
  cursor,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={styles['button']}
    style={{
      width: typeof size === 'number' ? size : size.width,
      height: typeof size === 'number' ? size : size.height,
      borderRadius: rounded ? '50%' : 0,
      cursor: cursor || 'pointer',
    }}
  >
    {icon}
  </button>
)
