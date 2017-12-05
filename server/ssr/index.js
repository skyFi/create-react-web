'use strict';

import log from 'rainbowlog';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import config from '../../core/common/config';
import routes from '../../core/router';
import reducers from '../../core/reducer';
import states from '../../core/state';
import Entry from '../../page/container/index';

// 监听文件变换
let _routes = routes;
let _reducers = reducers;
let _states = states;
process.on('webpack-rebundled', () => {
  _routes = require('../../core/router');
  _reducers = require('../../core/reducer');
  _states = require('../../core/state');

  log.debug('webpack-rebundled');
});

// 延时
const timeout = (time) => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Timed out.')), time);
});

module.exports = function(req, res) {
  (async () => {
    const version = global['config_version'] = require('../../version.json').version;
    // init state
    const initState = Object.assign({}, _states, {/* put init state here before fetch data */});
    let context = {};
    // create store
    const store = createStore(_reducers.default || _reducers, initState, applyMiddleware(thunk));
    // match routes, get pages
    const pages = matchRoutes(_routes.default || _routes, req.url);
    // ssr fetch data
    const promises = pages.map(({ route, match }) => {
      let _component = undefined;
      let fetchData = undefined;

      // when component is a function.
      if (route.component instanceof Function) {
        if (route.component.WrappedComponent instanceof Function) {
          fetchData = new route.component.WrappedComponent().fetchData;
        } else {
          route.component().props.load((component) => {
            _component = component.default || component;
          });

          if (_component) {
            if (typeof _component.WrappedComponent === 'function') {
              fetchData = new _component.WrappedComponent().fetchData;
            } else {
              fetchData = new _component().fetchData;
            }
          }
        }
      }
      //todo: other component type ... write here. if you need.

      // do fetch data
      return fetchData instanceof Function ? fetchData(store.dispatch, match, store) : Promise.resolve(null)
    });

    // set timeout to fetch data
    try {
      await Promise.race([
        Promise.all(promises),
        timeout(config.apiTimeout || 10000)
      ]);
    } catch (error) {
      log.error(error);
    }

    // set some other init state after fetch data.
    const initStateAfterFetchData = {};
    initStateAfterFetchData['Skylor min'] = true;
    //todo: put you init state code here, if you need.

    // dispatch state after fetch data, all
    store.dispatch({
      type: 'server_side/init_state',
      ...initStateAfterFetchData
    });

    // render to string for html
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Entry />
        </StaticRouter>
      </Provider>
    );

    // handle the special characters that javascript can't parse.
    let stateString = JSON.stringify(store.getState());
    stateString = stateString.replace(/[\u00a0\ufeff]/g, '');
    stateString = stateString.replace(/[\u2028\u2029]/g, '\\n');

    // return data for ejs template.
    return {
      html,
      version,
      __INITIAL_STATE__: stateString,
      cdn: config.cdn,
      dns: config.dns,
      bundlePostfix: process.env.NODE_ENV === 'development' ? `?timestamp=${Date.now()}` : '',
    }
  })().then((data) => {
    if (data.notFound) {
      data.number = req.path === '/error/ie.html' ? 403 : 404;
      res.status(data.number).render('error.html', data);
    } else {
      res.render('index.html', data);
    }
  }, (err) => {
    log.error(err.stack || err);
    res.status(500).render('error.html', {
      number: 500,
      cdn: config.cdn,
      dns: config.dns,
    });
  });
};
