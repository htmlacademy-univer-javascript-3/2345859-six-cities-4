import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/app';
import { Provider } from 'react-redux';
import { store } from './Store';
import HistoryRouter from './components/history-of-routes';
import browserHistory from './types/browser-history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <HistoryRouter history={browserHistory}>
          <ToastContainer />
          <App />
        </HistoryRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
