import { FC, MouseEvent, ReactNode } from 'react'
import styled from 'styled-components'

interface IIconButtonContainerProps {
  size: number | { width: number; height: number }
}

interface IIconWrapperProps {
  rounded?: boolean
}

interface IIconButtonProps extends IIconButtonContainerProps {
  icon: ReactNode
  rounded?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}
const IconWrapper = styled.div<IIconWrapperProps>`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ rounded }) => (rounded ? '50%' : '0')};
  > img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ButtonContainer = styled.button<IIconButtonContainerProps>`
  padding: 0;
  border: none;
  background: transparent;
  &:hover {
    background: transparent;
    &:before {
      background: #2121211e;
    }
  }
  &:focus {
    outline: none;
    &:before {
      background: #2121211e;
    }
  }
  &:active {
    &:before {
      background: #2121212f;
    }
  }
  position: relative;
  z-index: 1;
  &:before {
    transition: background 0.2s linear;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 185%;
    height: 185%;
    background: transparent;
    border-radius: 50%;
    z-index: -1;
  }
  width: ${({ size }) => (typeof size === 'number' ? size : size.width)}px;
  height: ${({ size }) => (typeof size === 'number' ? size : size.height)}px;
  cursor: pointer;
`
const IconButton: FC<IIconButtonProps> = ({ icon, size, onClick, rounded }) => {
  return (
    <ButtonContainer size={size} type="button" onClick={onClick}>
      <IconWrapper rounded={rounded}>{icon}</IconWrapper>
    </ButtonContainer>
  )
}

export default IconButton
