const path = require('path');
// const { name } = require('./package');
const { name } = require('./package.json');
const { buildConfig } = require('./buildConfig.json');
const port = 3000;
function resolve(dir) {
  return path.join(__dirname, dir);
}
const env = process.env.NODE_ENV;
module.exports = {
  publicPath: env === 'development' ? `http://localhost:${port}` : `${buildConfig[env]}${name}/`,
  outputDir: 'micro-sub',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
