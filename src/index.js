import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/index.js'; 
import App from './App.js'; // Import the App component

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeInstance = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = document.getElementById('root');
const appRoot = createRoot(root);
appRoot.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
