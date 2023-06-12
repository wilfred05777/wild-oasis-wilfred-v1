// @ts-nocheck
import './App.css'

import styled from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import Heading from './ui/Heading'
import Button from './ui/Button'
import Input from './ui/Input'

const StyledApp = styled.main`
  /* background-color: var(--color-red-800); */
  background-color: red;
  padding: 20px;
`
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        {/* <Heading type='h1'>The Wild Oasis!</Heading> */}
        {/* Useful for SEO instead of type we change it to as= meaning as prop/property part of styled-components*/}
        <Heading as='h1'>The Wild Oasis!</Heading>
        <Heading as='h2'>Check in and out!</Heading>
        <Button onClick={() => alert('Check in')}>Check in</Button>

        <Button onClick={() => alert('Check out')}>Check out</Button>

        <Heading as='h3'>Form</Heading>
        <Input type='number' placeholder='Number of guests' />
        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
    </>
  )
}

export default App
