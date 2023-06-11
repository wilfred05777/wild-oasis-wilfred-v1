// @ts-nocheck
// import React from 'react'
import './App.css'

import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
  /* font-style: oblique; */
`

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;

  margin: 20px;
`

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`

const StyledApp = styled.main`
  background-color: red;
  padding: 20px;
`
// const Spacing = styled.spacing`
//   margin: 0 20px;
// `

function App() {
  return (
    <>
      <GlobalStyles>
        <StyledApp>
          <H1>The Wild Oasis!</H1>
          <Button onClick={() => alert('Check in')}>Check in</Button>

          <Button onClick={() => alert('Check out')}>Check out</Button>

          <Input type='number' placeholder='Number of guests' />
          <Input type='number' placeholder='Number of guests' />
        </StyledApp>
      </GlobalStyles>
    </>
  )
}

export default App
