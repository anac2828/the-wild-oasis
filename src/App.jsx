import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
//
import GlobalSyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Cabins from './pages/Cabins';
import Checkin from './pages/Checkin';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';
import ProtectedRoute from './ui/ProtectedRoute';

// staleTime is amount of the the data will be store in RQ cache.
const queryClient = new QueryClient({
  // data always be state and will be fetched when it changes
  defaultOptions: { queries: { staleTime: 0 } },
  // defaultOptions: { staleTime: 60 * 1000 },
});

// DECLARATIVE WAY OF SETTING UP ROUTES - We don't need to use useLoaders like in the pizza app so we are using the route setup
function App() {
  return (
    <DarkModeProvider>
      {/* // Data provider with React-query */}
      <QueryClientProvider client={queryClient}>
        {/* React Query browser dev tools */}
        <ReactQueryDevtools initialIsOpen={false} />
        {/* CSS global styles */}
        <GlobalSyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* An index route is needed. AppLayout routes are children of the ProtectedRoute component also and will return route if use is authenticated*/}
              {/* Routes render inside the AppLayout */}
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
  );
}

export default App;
