const path = require('path');
const { name } = require('./package');
const accessPath = process.env.VUE_APP_ACCESS_PATH;

const port = 8081;
module.exports = {
  publicPath: accessPath,
  devServer: {
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve('./src'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
