import { useEffect, useRef } from 'react'

export function useCloseModal(handler, listenCapturing = true) {
  // ref selects the HTML element
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      // e.target is where the click event happens
      // ref.current is the modal window. When you click outside the window will close.
      if (ref.current && !ref.current.contains(e.target)) handler()
    }

    // Setting listenCapturing to true will prevent the modal window to close as soon as the "addCabin" button is clicked, because the eventListener will be handled as the event moves down the DOM tree.
    document.addEventListener('click', handleClick, listenCapturing)

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing)
  }, [handler, listenCapturing])
  return ref
}
