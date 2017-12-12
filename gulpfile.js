/* eslint no-console: 0, radix: 0, guard-for-in: 0, import/no-mutable-exports: 0 */

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const color = require('cli-color');
const del = require('del');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('merge-stream');
const gulpSequence = require('gulp-sequence');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const file = require('gulp-file');
const rename = require('gulp-rename');
const config = require('./src/core/common/config');
const iconPlugin = require('./icon-plugin');

// 开发
let isDev = false;
// 版本号
let revisioned = false;
let callbacked = false;
let configCallbacked = false;
let bundleAnalyzer = false;

gulp.task('clean', () => {
  return del('public/**/*');
});

// 复制文件
gulp.task('copy', () => {
  return merge(
    // 复制图片
    gulp.src('src/core/asset/img/**/*')
      .pipe(changed('public/images'))
      .pipe(gulp.dest('public/images')),

    // 复制图标
    gulp.src('src/core/asset/img/favicon.ico')
      .pipe(changed('public'))
      .pipe(gulp.dest('public')),

    // 复制第三方包
    gulp.src('src/core/vendor/**/*')
      .pipe(changed('public'))
      .pipe(gulp.dest('public')),

    // 压缩单个JS文件
    gulp.src('src/core/vendor/**/*.js')
      .pipe(babel())
      .pipe(uglify())
      .pipe(changed('public'))
      .pipe(gulp.dest('public')),

    // 写入less配置
    gulp.src('src/core/page/style/common/config.less')
      .pipe(file('config.less', `@cdn: '${config.cdn}';`))
      .pipe(gulp.dest('src/core/page/style/common')),

    // 生成SVG
    gulp.src('src/core/asset/svg/**/*.svg')
      .pipe(iconPlugin())
      .pipe(rename((path) => {
        path.extname = '.js';
      }))
      .pipe(gulp.dest('src/core/page/icon'))
  );
});

// 生成新版本号
gulp.task('revision', () => {
  if (revisioned) {
    return;
  }
  // 生成版本号
  config.version = Math.round(Math.random() * 10000000) + 10000000;
  // 替换配置信息
  fs.writeFileSync(path.join(__dirname, '/version.json'), `{"version": "${config.version}"}`, 'utf-8');
  revisioned = true;
});

// 配置打包文件
gulp.task('webpack-config', (callback) => {
  webpack({
    watch: isDev,
    entry: {
      vendors: [
        './src/core/common/config.js',
      ],
    },
    output: {
      path: `${__dirname}/public/`,
      filename: `config.${config.version}.js`,
      library: 'config',
      // libraryTarget: 'global',
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?presets[]=react&presets[]=es2015&plugins[]=transform-runtime']
      }]
    },
    plugins: [
      new webpack.DllPlugin({
        path: `${__dirname}/config-manifest.json`,
        name: 'config',
        context: __dirname,
      }),
      (!isDev && new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      })) || (() => {}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      }),
    ],
  }, (err, stats) => {
    if (err) {
      console.log(err);
    }

    if (stats.compilation.errors.length > 0) {
      console.log(stats.compilation.errors[0].message);
    }

    console.log(`${color.cyan('webpack-config')}: done ${color.magenta(`${stats.toJson({ timing: true }).time} ms`)}`);

    if (!configCallbacked) {
      configCallbacked = true;
      callback();
    }

    if (!err && stats.compilation.errors.length === 0) {
      process.emit('webpack-rebundled');
    }
  });
});

// 打包项目中的三方包
gulp.task('webpack-dll', (callback) => {
  webpack({
    entry: {
      vendors: [
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'react-redux',
        'redux',
        'redux-thunk',
        'lodash',
      ],
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: `vendors.${config.version}.js`,
      library: '[name]',
    },
    plugins: [
      new webpack.DllPlugin({
        path: `${__dirname}/dll-manifest.json`,
        name: '[name]',
        context: __dirname,
      }),
      (!isDev && new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      })) || (() => {}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      })
    ]
  }, (err, stats) => {
    if (err) {
      console.log(err);
    }

    if (stats.compilation.errors.length > 0) {
      console.log(stats.compilation.errors[0].message);
    }
    callback();


    if (!err && stats.compilation.errors.length === 0) {
      process.emit('webpack-rebundled');
    }
  });
});

// 打包移动端文件
gulp.task('webpack-page', (callback) => {
  console.log({isDev});
  webpack({
    watch: isDev,
    devtool: isDev ? 'source-map' : '',
    entry: [
      './src/page/index.js',
    ],
    output: {
      path: path.join(__dirname, 'public'),
      filename: `page.${config.version}.js`,
      publicPath: '/',
      chunkFilename: 'c/[name].[chunkhash:6].chunk.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'happypack/loader',
          options: {
            id: 'js'
          }
        }],
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'raw-loader',
              options: {
                minimize: !isDev,
              }
            },
            'postcss-loader',
            'less-loader',
          ],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'raw-loader',
              options: {
                minimize: !isDev,
              }
            },
            {
              loader: 'postcss-loader',
            },
          ],
          fallback: 'style-loader',
        })
      }, {
        test: /\.(jpg|png)$/,
        use: ['url-loader'],
      }, {
        test: /\.yml$/,
        use: ['json-loader', 'yaml-loader']
      }, {
        test: /\.svg/,
        use: ['svg-loader']
      }],
    },
    plugins: [
      bundleAnalyzer ? new BundleAnalyzerPlugin(BundleAnalyzerOptions(8880)) : (() => {}),
      new HappyPack({
        id: 'js',
        loaders: ['babel-loader'],
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll-manifest.json'),
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./config-manifest.json'),
      }),
      new ExtractTextPlugin(`page.${config.version}.css`),
      (!isDev && new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      })) || (() => {}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.less', '.png', 'jpg'],
      alias: {

      },
    },
  }, (err, stats) => {
    if (err) {
      console.log(err);
    }

    if (stats.compilation.errors.length > 0) {
      console.log(stats.compilation.errors[0].message);
    }

    if (!callbacked) {
      callbacked = true;
      if (err) {
        callback(err);
      } else if ((stats.errors || []).length > 0) {
        callback(stats.errors[0]);
      } else {
        callback();
      }
    } else {
      console.log(`${color.cyan('webpack-page')}: done ${color.magenta(`${stats.toJson({ timing: true }).time} ms`)}`);
    }

    if (!err && stats.compilation.errors.length === 0) {
      process.emit('webpack-rebundled');
    }
  });
});

// 监听变动
gulp.task('watch', () => {
  // 修改配置文件
  isDev = true;

  // 监听
  gulp.watch([
    'core/asset/img/**/*',
    'core/asset/svg/**/*',
  ], [
    'copy',
  ]);
});

gulp.task('analyse-option', () => {
  // 修改配置文件
  bundleAnalyzer = true;
});

// 启动开发服务器
gulp.task('server', () => {
  process.env.NODE_ENV = 'development';
  require('./index.js');
});

// 分析打包文件
gulp.task('rebuild-icon', ['clean', 'copy']);
gulp.task('analyse', ['analyse-option', 'revision', 'webpack-config', 'webpack-dll', 'webpack-page']);
gulp.task('dev', gulpSequence('watch', 'copy', 'revision', 'webpack-config', 'webpack-dll', 'webpack-page', 'server'));

// bundle分析器配置
function BundleAnalyzerOptions(port) {
  return {
    // Can be `server`, `static` or `disabled`.
    // In `server` mode analyzer will start HTTP server to show bundle report.
    // In `static` mode single HTML file with bundle report will be generated.
    // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
    analyzerMode: 'server',
    // Host that will be used in `server` mode to start HTTP server.
    analyzerHost: '127.0.0.1',
    // Port that will be used in `server` mode to start HTTP server.
    analyzerPort: port,
    // Path to bundle report file that will be generated in `static` mode.
    // Relative to bundles output directory.
    reportFilename: 'report.html',
    // Module sizes to show in report by default.
    // Should be one of `stat`, `parsed` or `gzip`.
    // See "Definitions" section for more information.
    defaultSizes: 'parsed',
    // Automatically open report in default browser
    openAnalyzer: true,
    // If `true`, Webpack Stats JSON file will be generated in bundles output directory
    generateStatsFile: false,
    // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
    // Relative to bundles output directory.
    statsFilename: 'stats.json',
    // Options for `stats.toJson()` method.
    // For example you can exclude sources of your modules from stats file with `source: false` option.
    // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    statsOptions: null,
    // Log level. Can be 'info', 'warn', 'error' or 'silent'.
    logLevel: 'info'
  };
}

