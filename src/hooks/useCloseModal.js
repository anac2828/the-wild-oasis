import { useEffect, useRef } from 'react';

export function useCloseModal(handler, listenCapturing = true) {
  //ref link the element that it is used on
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // ref.current is the modal window. When you click outside the window will close.
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    // If listenCapturing is true the event will be handled in the capturing face as the event moves down the DOM tree. The click event will not bubble up the DOM.
    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
