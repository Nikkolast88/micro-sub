const path = require('path');
const { name } = require('./package');
const { buildConfig } = require('./buildConfig.json');
const port = 8081;
const env = process.env.NODE_ENV;
module.exports = {
  publicPath: env === 'development' ? `http://localhost:${port}` : `${buildConfig[env]}${name}/`,
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
