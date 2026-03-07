import { styled } from 'styled-components'

import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`
// ** COMPONENT
function ProtectedRoute({ children }) {
  // Navigate can only be used inside another function or hook. We use the useEffect function to be able to use the navigate
  const navigate = useNavigate()

  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser()

  // 2. If ther is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, isLoading, navigate])

  // 3. Show Spinner while page is loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. If there IS a user, render the app (children)
  if (isAuthenticated) return children
}
export default ProtectedRoute
