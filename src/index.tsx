import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Loader } from './components/tools/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<Loader></Loader>}/> 
    </Provider>
  </React.StrictMode>
);
