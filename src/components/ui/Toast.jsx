import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1a1a1a',
          color: '#e5e5e5',
          border: '1px solid #3a3a3a',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#fcee0a',
            secondary: '#0a0a0a',
          },
          style: {
            border: '1px solid #fcee0a',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0a0a0a',
          },
          style: {
            border: '1px solid #ef4444',
          },
        },
      }}
    />
  );
};

