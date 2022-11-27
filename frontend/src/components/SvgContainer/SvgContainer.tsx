import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ISvgDiv {
  size:
    | {
        width: number
        height: number
      }
    | number
  borderRadius?: number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}
interface ISvgContainerProps extends ISvgDiv {
  icon: ReactNode
}

const SvgDiv = styled.div<ISvgDiv>`
  width: ${({ size }) => (typeof size === 'number' ? size : size.width)}px;
  height: ${({ size }) => (typeof size === 'number' ? size : size.height)}px;
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
