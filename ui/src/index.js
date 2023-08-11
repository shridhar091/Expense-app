import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'

import configureStore from './store/configureStore';
import App from './App';

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider> 
);


