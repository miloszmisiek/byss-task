import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
