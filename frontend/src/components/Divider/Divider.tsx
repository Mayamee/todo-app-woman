import styled from 'styled-components'

interface IDividerProps {
  height: number
}

const Divider = styled.div<IDividerProps>`
  height: ${({ height }) => height}px;
`

export default Divider
