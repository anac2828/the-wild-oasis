import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useCloseModal } from '../hooks/useCloseModal';

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

// 1 Create context
const ModalContext = createContext();

// 2 create Parent Component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  // setOpenName will set the openName to the name if the window that needs to be open. This allows different windows to be open on the same modal
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. Create child components to help implementing the common task
function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);

  // The clone element is the Button because we cannot pass the open function to the button. cloneElement should not
  // args: children component, props
  return cloneElement(children, { onClick: () => open(windowName) });
}

// react portal renders an element outside the parent but leaves it in the same postion in the dome tree
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  // selects the styledModal element

  // closes modal when a click is detected outside modal window
  const ref = useCloseModal(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        {/* Close button */}
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* children is the Form, props passed to the Form. This will allow to style the form */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    // will be rendered in the html body element
    document.body
  );
}

// 4. Add child components as propeties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
