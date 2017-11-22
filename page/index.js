import React from 'react';
import {render} from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../core/router';
import reducers from '../core/reducer';

// style entry
import './style/index.less';

import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

if (!window.global) {
  window.global = window;
}

const store = createStore(
  reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
);

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
};

render(<AppRouter />, document.querySelector('#root'));