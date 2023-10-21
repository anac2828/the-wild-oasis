import { useEffect, useRef } from 'react';

export function useCloseModal(handler, listenCapturing = true) {
  //ref link the element that it is used on
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // if the modal window is click it will not close. It will only close if the OVERLAY element is clicked.
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    // true is to catch the event when it moves down the DOM tree and the up the DOM tree. This will prevent that when the add cabin button is clicked it does not close the modal right away.
    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
