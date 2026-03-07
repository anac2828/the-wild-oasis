import { useState, useEffect } from 'react'

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    // Get store value from localstorage
    const storedValue = localStorage.getItem(key)

    // If there is no store value return initialState
    return storedValue ? JSON.parse(storedValue) : initialState
  })

  // Will run on when "value" changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key],
  )

  return [value, setValue]
}
