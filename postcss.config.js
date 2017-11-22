'use strict';

module.exports = {
  plugins: [
    require('autoprefixer')(), // 补全兼容前缀
    require('cssnano'), // 压缩(需放最后)
  ]
};