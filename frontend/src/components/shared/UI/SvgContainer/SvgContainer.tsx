import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ISvgDiv {
  size:
    | {
        width: string
        height: string
      }
    | string
  borderRadius?: number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}
interface ISvgContainerProps extends ISvgDiv {
  icon: ReactNode
}

const SvgDiv = styled.div<ISvgDiv>`
  width: ${({ size }) => (typeof size === 'string' ? size : size.width)};
  height: ${({ size }) => (typeof size === 'string' ? size : size.height)};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
  > svg {
    width: 100%;
    height: 100%;
    object-fit: ${({ fit }) => fit || 'cover'};
  }
`

const SvgContainer: FC<ISvgContainerProps> = ({ size, borderRadius, icon, fit = 'cover' }) => {
  return (
    <SvgDiv size={size} fit={fit} borderRadius={borderRadius}>
      {icon}
    </SvgDiv>
  )
}

export default SvgContainer
