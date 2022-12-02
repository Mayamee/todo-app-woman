import { FC, MouseEvent, ReactNode, RefObject, useId } from 'react'
import Tooltip, { TooltipProps } from 'react-tooltip'
import styles from './TooltipButton.module.scss'

interface ITooltipButton extends Pick<TooltipProps, 'effect' | 'place' | 'getContent'> {
  icon: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  tooltipContent: string
  size: number | { width: number; height: number }
  _ref?: RefObject<HTMLButtonElement>
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

const TooltipButton: FC<ITooltipButton> = ({
  icon,
  size,
  rounded,
  cursor,
  onClick,
  _ref,
  tooltipContent,
  ...rest
}) => {
  const buttonId = useId()
  return (
    <>
      <button
        type="button"
        data-for={buttonId}
        data-tip={tooltipContent}
        onClick={onClick}
        ref={_ref}
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
      <Tooltip
        id={buttonId}
        effect={rest.effect}
        place={rest.place}
        arrowColor="transparent"
        backgroundColor="transparent"
        padding="0"
        getContent={rest.getContent}
      />
    </>
  )
}
export default TooltipButton
