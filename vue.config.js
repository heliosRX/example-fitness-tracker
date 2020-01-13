const path = require('path')
// Helpers
/* eslint-disable no-unused-vars */
const isBuild       = process.env.NODE_ENV === 'production';
const isDev         = process.env.NODE_ENV !== 'production';
const ifBuild       = x => isBuild && x;
const ifDev         = x => isDev && x;
const removeEmpty   = arr => arr.filter(Boolean);
const enabled       = x => x;
const disabled      = x => null;
const isBuildTarget = (t,x) => ( process.env.DEPLOY_TARGET === t ) && x;
/* eslint-enable no-unused-vars */

// vue.config.js
module.exports = {
  devServer: {
    watchOptions: {
      ignored: [
        'node_modules',
        '**/node_modules/**',
        '/build/.cache',
        '/docs',
        '/.git'
      ]
    },
    disableHostCheck: true,
    // host: 'app.helios.test',
    historyApiFallback: {
      rewrites: [
        { from: /./, to: path.join('/', 'index.html') }
      ]
    },
  },
  configureWebpack: {
    devtool: isBuild ? false : 'cheap-module-eval-source-map',
    optimization: {
      minimize: isBuild,
    },
  },
  css: {
    loaderOptions: {
      sass: {
      }
    }
  },
  runtimeCompiler: true,
};
