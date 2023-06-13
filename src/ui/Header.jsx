/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  /* background-color: orangered; */
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`

function Header() {
  return (
    <StyledHeader>
      <p></p>
      Header
    </StyledHeader>
  )
}

export default Header
