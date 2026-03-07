import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
//
import GlobalSyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Booking from './pages/Booking'
import Cabins from './pages/Cabins'
import Checkin from './pages/Checkin'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext'
import ProtectedRoute from './ui/ProtectedRoute'

// ** REACT QUERY CLIENT SETUP - Will save data in a cache
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } }, // Setting the stale time to 0 will make query refetch the data as soon as there is a change in supabase.
  // defaultOptions: { staleTime: 60 * 1000 },
})

// DECLARATIVE WAY OF SETTING UP ROUTES - We don't need to use useLoaders like in the pizza app so we are using the route setup
// To load data we are using react-query
function App() {
  return (
    <DarkModeProvider>
      {/* // Data provider with React-query */}
      <QueryClientProvider client={queryClient}>
        {/* React Query browser dev tools */}
        <ReactQueryDevtools initialIsOpen={false} />
        {/* CSS global styles */}
        <GlobalSyles />
        {/* ROUTE SETUP */}
        <BrowserRouter>
          <Routes>
            {/* LAYOUT ROUTE - does not need the path*/}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* NESTED ROUTES */}
              {/* An index route is needed.}
              {/* Routes render inside the AppLayout in the Outlet component. This routes are also children of the ProtectedRoute */}
              {/* When user goes to the BASE URL "/" they will be redirected to "/dashboard" and replace will overwrite the history stack in the browser */}
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
              <Route path='account' element={<Account />} />
            </Route>
            {/* Will not be rendered inside the AppLayout component */}
            <Route path='login' element={<Login />} />
            <Route path='reset-password' element={<ResetPassword />} />
            {/* ERROR HANDLING FOR ROUTES NOT FOUND */}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Needed for toast.success() and toast.error() to work */}
        <Toaster
          position='top-center'
          // Space between toaster and window
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
