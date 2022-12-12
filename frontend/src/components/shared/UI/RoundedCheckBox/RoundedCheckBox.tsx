import { ChangeEvent, FC, useId } from 'react'
import styled from 'styled-components'

interface ILabelCheckBoxProps {
  size:
    | number
    | {
        width: number
        height: number
      }
  borderSize: number
  color: string
}

const CheckBoxLabel = styled.label<ILabelCheckBoxProps>`
  width: ${({ size }) => (typeof size === 'number' ? size : size.width)}px;
  height: ${({ size }) => (typeof size === 'number' ? size : size.height)}px;
  border: ${({ borderSize, color }) => `${borderSize}px solid ${color}`};
  position: relative;
  display: block;
  border-radius: 50%;
  &:has(input: checked) {
    background-color: ${({ color }) => color};
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    height: 0;
    width: 0;
  }
`
interface IRoundedCheckBoxProps extends ILabelCheckBoxProps {
  isChecked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RoundedCheckBox: FC<IRoundedCheckBoxProps> = ({
  size,
  borderSize,
  color,
  onChange,
  isChecked,
}) => {
  const id = useId()
  return (
    <CheckBoxLabel htmlFor={id} size={size} borderSize={borderSize} color={color}>
      <input checked={isChecked} id={id} type="checkbox" onChange={onChange} />
    </CheckBoxLabel>
  )
}

export default RoundedCheckBox
