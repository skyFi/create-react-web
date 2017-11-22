'use strict';

require('babel-register');
process.on('unhandledRejection', (reason, p) => {
  log.error(reason.stack);
});

require('./server');