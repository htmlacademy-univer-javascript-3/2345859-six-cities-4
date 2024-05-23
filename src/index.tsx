import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './/app';
import { Provider } from 'react-redux';
import { store } from './TheStore';

import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
