import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useCloseModal } from '../hooks/useCloseModal';

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

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
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

// Context

const MenusContext = createContext();

// Parent
function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPostion] = useState(null);
  const close = () => setOpenId('');
  const open = setOpenId;
  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPostion }}>
      {children}
    </MenusContext.Provider>
  );
}

// children
// Toggle will set the opendId to the id of the cabin that it was clicked on
function Toggle({ id }) {
  const { openId, close, open, setPostion } = useContext(MenusContext);

  function handleClick(e) {
    // gets info of button clicked on to set the position on the window
    const rect = e.target.closest('button').getBoundingClientRect();

    // determines the position of the menus window
    setPostion({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    // if openID is an empty string or it is not the same as the ID it will open the menus window otherwise it will close it
    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// If openId matches the id of the cabin clicked on, the List component with the buttons will be displayed
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useCloseModal(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={{ x: position.x, y: position.y }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

// onClick comes from the Cabin row
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Menu is the styled component
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
