'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const log = require('rainbowlog');
const cookieParser = require('cookie-parser');
const config = require('../core/common/config');

const app = express();
app.set('views', path.join(__dirname, '../core/view'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 按需加载的js文件
app.use('/c', express.static(path.join(__dirname, '../public/chunk'), { maxAge: 86400000 * 30 }));
// 服务器静态文件加载
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 86400000 * 30 }));
app.use(require('compression')());
app.use(cookieParser());
app.listen(config.port, (err) => {
  if (err) {
    log.error(err.stack || err);
    return;
  }
  log.info(`Server is up in ${process.uptime()}s, at port: ${config.port}`);
});
app.all('*', require('./ssr'));