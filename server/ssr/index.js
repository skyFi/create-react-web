'use strict';

const log = require('rainbowlog');
const config = require('../../core/common/config');
let version = global['config_version'] = require('../../version.json').version;
global.config = require(`../../public/config.${version}.js`).config; // load global.config
global.port = config.port;

import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import routes from '../../core/router';
import reducers from '../../core/reducer';
import states from '../../core/state';

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

module.exports = function(req, res) {
  (async () => {
    const cntStates = Object.assign({}, _states);

    let context = {};
    const store = createStore(_reducers.default || _reducers, cntStates);

    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(_routes.default || _routes)}
        </StaticRouter>
      </Provider>
    );

    return {
      html,
      version,
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