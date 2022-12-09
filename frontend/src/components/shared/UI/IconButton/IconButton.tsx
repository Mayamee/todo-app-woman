import { FC, MouseEvent, ReactNode } from 'react'
import styled from 'styled-components'

interface IButtonContainerProps {
  size: number | { width: number; height: number }
  rounded?: boolean
}

interface IIconContainer {
  rounded?: boolean
}

interface IIconButtonProps extends IButtonContainerProps {
  icon: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const ButtonContainer = styled.button<IButtonContainerProps>`
  width: ${({ size }) => (typeof size === 'number' ? size : size.width)}px;
  height: ${({ size }) => (typeof size === 'number' ? size : size.height)}px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.2s ease;
    border-radius: ${({ rounded }) => (rounded ? '50%' : '0')};
  }
  &:hover {
    &:before {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      &:before {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`
const IconContainer = styled.div<IIconContainer>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  height: 65%;
  overflow: hidden;
  border-radius: ${({ rounded }) => (rounded ? '50%' : '0')};
  > svg,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const IconButton: FC<IIconButtonProps> = ({ icon, size, onClick, rounded }) => {
  return (
    <ButtonContainer rounded={rounded} size={size} type="button" onClick={onClick}>
      <IconContainer rounded={rounded}>{icon}</IconContainer>
    </ButtonContainer>
  )
}

export default IconButton
