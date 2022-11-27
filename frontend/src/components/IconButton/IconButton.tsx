import { FC, MouseEvent, ReactNode } from 'react'
import styled from 'styled-components'

interface IIconButtonContainerProps {
  size: number | { width: number; height: number }
}

interface IIconButtonProps extends IIconButtonContainerProps {
  icon: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

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
    width: 200%;
    height: 200%;
    background: transparent;
    border-radius: 50%;
    z-index: -1;
  }
  width: ${({ size }) => (typeof size === 'number' ? size : size.width)}px;
  height: ${({ size }) => (typeof size === 'number' ? size : size.height)}px;
  cursor: pointer;
  > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const IconButton: FC<IIconButtonProps> = ({ icon, size, onClick }) => {
  return (
    <ButtonContainer size={size} type="button" onClick={onClick}>
      {icon}
    </ButtonContainer>
  )
}

export default IconButton
