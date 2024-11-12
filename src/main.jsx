import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Error handling while react is rendering */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // ErrorFallback will get access to the onReset prop.
      onReset={() => window.location.replace('/')}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
