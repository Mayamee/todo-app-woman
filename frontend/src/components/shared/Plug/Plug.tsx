import styled from 'styled-components'

interface IPlugProps {
  height: number
}

const Plug = styled.div<IPlugProps>`
  height: ${({ height }) => height}px;
`

export default Plug
