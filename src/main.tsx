import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/global.css';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
);
