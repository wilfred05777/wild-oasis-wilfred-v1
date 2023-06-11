// @ts-nocheck
import './App.css'

import styled from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: var(--color-yellow-100);
  /* font-style: oblique; */
`
const StyledApp = styled.main`
  background-color: var(--color-red-800);
  padding: 20px;
`
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis!</H1>
        <Button onClick={() => alert('Check in')}>Check in</Button>

        <Button onClick={() => alert('Check out')}>Check out</Button>

        <Input type='number' placeholder='Number of guests' />
        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
    </>
  )
}

export default App
