/* eslint import/no-dynamic-require:0 */
import React from 'react';
import Bundle from './bundle';
import { reload } from '../lib/funcs';

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
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/home')), 'home')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  },
  {
    path: '/about',
    exact: true,
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/about')), 'about')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  },
  {
    path: '/contact/:id?',
    exact: true,
    component: props => (
      <Bundle load={cb => require.ensure([], require => cb(require('../../page/container/contact')), 'contact')}>
        { Home => <Home {...props} /> }
      </Bundle>)
  }
];

export default routes;
