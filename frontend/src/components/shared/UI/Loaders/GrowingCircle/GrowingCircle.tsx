import { FC } from 'react'
import styled from 'styled-components'

interface ISpinnerProps {
  borderSize: number
}

const Spinner = styled.div<ISpinnerProps>`
  width: 99%;
  height: 99%;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: ${({ borderSize }) => borderSize}px solid #000;
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`

interface IGrowingCircleProps {
  size: number
}
const GrowingCircle: FC<IGrowingCircleProps> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      overflow: 'hidden',
    }}
  >
    <Spinner borderSize={size * 0.13} />
  </div>
)

export default GrowingCircle
