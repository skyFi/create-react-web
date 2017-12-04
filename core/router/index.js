/* eslint import/no-dynamic-require:0 */
import React from 'react';
import Bundle from './bundle';

// require newest file
const reload = (requiredModulePath) => {
  const resolved = require.resolve(requiredModulePath);
  const cache = require.cache[resolved];
  delete require.cache[resolved];
  try {
    return require(requiredModulePath);
  } catch (err) {
    console.error('Error occurred while reloading module, rollback to cached one.\n =>', err.stack || err);
    require.cache[resolved] = cache || (() => {});
    return require(requiredModulePath);
  }
};

// require ensure hook used for server
if (typeof require.ensure !== 'function') {
  require.ensure = (dependencies, callback, chunkName) => {
    if (!chunkName) {
      console.error('chunk name is undefined! ^o^');
    }
    callback(reload);
  };
}

const routes = [
  {
    path: '/',
    exact: true,
    title: 'home',
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/home')), 'home')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  },
  {
    path: '/about',
    exact: true,
    title: 'about',
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/about')), 'about')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  },
  {
    path: '/contact',
    exact: true,
    title: 'contact',
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/contact')), 'contact')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  }
];

export default routes;
