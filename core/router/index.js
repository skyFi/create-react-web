/* eslint import/no-dynamic-require:0 */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import Bundle from './bundle';

// 服务器渲染时候的钩子
if (typeof require.ensure !== 'function') {
  require.ensure = (dependencies, callback, chunkName) => {
    if (!chunkName) {
      console.error('没有指定Chunk的名称，这个是必须要的！^o^');
    }
    callback(require);
  };
}

const routes = [
  {
    path: '/',
    exact: true,
    title: 'home',
    component: (props) => (
      <Bundle load={(cb) => {
        require.ensure([], require => {
              cb(require('../../page/container/home'));
          }, 'home');
        }}
      >
        {(Home) => <Home {...props}/>}
      </Bundle>)
  },
  {
    path: '/about',
    exact: true,
    title: 'about',
    component: (props) => (
      <Bundle load={(cb) => {
        require.ensure([], require => {
              cb(require('../../page/container/about'));
          }, 'about');
        }}
      >
        {(About) => <About {...props}/>}
      </Bundle>)
  },
  {
    path: '/contact',
    exact: true,
    title: 'contact',
    component: (props) => (
      <Bundle load={(cb) => {
        require.ensure([], require => {
              cb(require('../../page/container/contact'));
          }, 'contact');
        }}
      >
        {(Contact) => <Contact {...props}/>}
      </Bundle>)
  }
];

export default routes;