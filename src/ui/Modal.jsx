/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// step 1:
const ModalContext = createContext();

// step 2:
function Modal({ children}) {
  const [openName, setOpenName] = useState('');
  
  const close = () => setOpenName("");
  const open = setOpenName;

  return(
    <ModalContext.Provider
    value={{ openName, close, open }}
    >
      {children}
    </ModalContext.Provider>
)}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
  // return children;

}

function Window({ children, name, onClose }) {
  // adding this features from react-dom in this case makes the modal leave outside the parent elemen upon displaying in browser's DOM but in react component it is still under/inside its parent element which is the addCabin component
  // - acts as invisible tunnel/portal
  // - why do we used it, to avoid overflow in css property when somebody will re-used it

  const { openName, close } = useContext(ModalContext);
  
  if (name !== openName) return null;
  
  return createPortal(
    <Overlay>
      <StyledModal>
        {/* Modal */}

        <Button onClick={close} >
          <HiXMark />
        </Button>
        <div>
          {/* {children} */}
          {cloneElement(children, { onCloseModal:close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
    // document.querySelector
  )
}

// step 4:
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
