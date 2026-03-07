import styled from 'styled-components'
import { HiXMark } from 'react-icons/hi2'
import { createPortal } from 'react-dom'
import { cloneElement, createContext, useContext, useState } from 'react'
import { useCloseModal } from '../hooks/useCloseModal'

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
`

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
`

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
`

// **** COMPOUND COMPONENT ******

//* 1 CREATE CONTEXT
const ModalContext = createContext()

//* 2 CREATE PARENT COMPONENT
function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  // Handler functions that set which window will open or close
  const close = () => setOpenName('')
  // setOpenName will be called on the button it is passed as props (see below)
  // const open = setOpenName
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

//* 3 CREATE CHILD COMPONENTS FOR COMMON TASKS

// Button to open Modal Window
function Open({ children, windowNameToOpen }) {
  // open calls the setOpenName() to update the openName state
  const { open } = useContext(ModalContext)

  // cloneElement will clone the children components so that they have access to the useContext functions.
  // Pass the children and props object as arguments. The button inside Open component will call the open().
  return cloneElement(children, {
    onClick: () => open(windowNameToOpen),
  })
}

// Modal Window
function Window({ children, windowName }) {
  const { openName, close } = useContext(ModalContext)

  // custom hook to close the modal window when clicked outside the modal window.
  // cuseCloseModal returns a useRef() hook so we can link the Modal window to an eventHandler.
  const ref = useCloseModal(close)

  // The window will not open if the windowName and openName don't match.
  if (windowName !== openName) return null

  // createPortal renders an element outside the DOM tree, but leaves it in the same postion in the React Component tree
  // createPortal takes two arguments: JSX component and HTML element on which to render the JSX.
  return createPortal(
    <Overlay>
      {/* With the ref prop you can add an event listener */}
      <StyledModal ref={ref}>
        {/* Close X button on corner of window */}
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* The cloneElement function takes as params the children and props. onCloseModal prop is needed to style the CreateCabinForm component and to close the form*/}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    // Will be rendered in the html body element
    document.body,
  )
}

// 4. Add child components as propeties to parent component
Modal.Open = Open
Modal.Window = Window

export default Modal
