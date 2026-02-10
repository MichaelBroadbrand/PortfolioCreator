import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { ToastProvider } from './context/ThemeContext';
import AppRouter from './router';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkTokenSync() {
  const { getToken } = useAuth();

  useEffect(() => {
    // Make getToken available globally for the API service
    window.__clerkGetToken = getToken;
  }, [getToken]);

  return null;
}

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
    >
      Skip to content
    </a>
  );
}

function AppContent() {
  return (
    <ToastProvider>
      <SkipToContent />
      <ClerkTokenSync />
      <main id="main-content">
        <AppRouter />
      </main>
    </ToastProvider>
  );
}

function App() {
  // If Clerk key is not configured, render without Clerk (mock mode)
  if (!clerkPubKey || clerkPubKey.includes('your_clerk_key')) {
    return (
      <BrowserRouter>
        <ToastProvider>
          <SkipToContent />
          <main id="main-content">
            <AppRouter />
          </main>
        </ToastProvider>
      </BrowserRouter>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
