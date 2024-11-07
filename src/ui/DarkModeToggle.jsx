import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  // isDarkMode returns "true" or "false"
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
