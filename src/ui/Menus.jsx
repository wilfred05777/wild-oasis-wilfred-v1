/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

// const StyledMenu = styled.div`
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// wala ko kasabot sa katayuan aning MenuContext kanus-a ni gamiton
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  // store it in parent state 1
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      // 2 position, setPosition
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  // 3 setPostion
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // getBoundingClientRect - it's a DOM function, give data elements position
    const rect = e.target.closest("button").getBoundingClientRect();
    // console.log(rect);

    // 4 set position 
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
//  5 add position
  const { openId, close, position } = useContext(MenusContext);

  // clicking outside of the element will close the ... vertical
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    // 6 position={position}
    // <StyledList position={{ x: 20, y: 20 }} ref={ref}>
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

//  adding icon & onClick caller
function Button({ children, icon, onClick }) {

  // get from the context useContext
  const { close } = useContext(MenusContext);

  // define handleClick
  function handleClick() {
    // optional-Chaining what is the purpose of it? and how it works behind the scene?
    onClick?.();
    close(); // close menu get from the context which is the useContext
  }

  return (
    <li>
      {/* onClick={handleClick} */}
      <StyledButton onClick={handleClick}>
        {/* placing {icon} */}
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;