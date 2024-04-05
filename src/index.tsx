import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './/app';
import { Settings } from './settings_const';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Settings.placesCount} reviews={reviews} offers={offers} />
  </React.StrictMode>
);