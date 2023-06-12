// @ts-nocheck
/* eslint-disable no-constant-condition */
import styled from 'styled-components'

//
// const test = `
//   text-align: center;
//   ${10 > 5 && 'background-color: yellow'};
// `

const Heading = styled.h1`
  /* template literal */
  /* Useful for SEO instead of type we change it to as= meaning as prop/property part of styled-components*/

  ${(props) =>
    props.as === 'h1' &&
    `
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    `
    font-size: 2rem;
    font-weight: 500;
    `}
  ${(props) =>
    props.as === 'h3' &&
    `
    font-size: 2rem;
    font-weight: 500;
    `} /*  */
    /* ${(props) =>
    props.type === 'h1' &&
    `
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === 'h2' &&
    `
    font-size: 2rem;
    font-weight: 500;
    `}
  ${(props) =>
    props.type === 'h3' &&
    `
    font-size: 2rem;
    font-weight: 500;
    `} */
    
    /*  */
    /* font-size: 30px;
  font-weight: 600; */
`

export default Heading
