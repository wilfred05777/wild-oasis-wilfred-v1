/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

// ...props received and first here
function Select({ options, value, onChange, ...props }) {
  // console.log(props)

  return (
    // javascrip mode {...props} spread operator @ 2nd here being used
    <StyledSelect value={value} onChange={onChange} {...props}>
      {
        options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)
      }
    </StyledSelect>
  )
}

export default Select;