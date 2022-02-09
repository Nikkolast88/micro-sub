const path = require('path');
const { name } = require('./package');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

const package = require('./package.json');
const dayjs = require('dayjs');
// const assetPath = process.env.VUE_APP_ASSET_URL;
const fileName =
  package.name + '-' + package.version + '-' + dayjs().format('YYYYMMDD-HHmm');

const publicPath = process.env.VUE_APP_PUBLIC_PATH;
// const assetPath = process.env.VUE_APP_ASSET_PATH;
const port = 8081;
module.exports = {
  publicPath: publicPath,
  outputDir: fileName,
  devServer: {
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      // 自定义主题
      scss: {
        // eslint-disable-next-line quotes
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
  chainWebpack: (config) => {
    // const svgRule = config.module.rule('svg');

    // svgRule.uses.clear();
    config.resolve.alias.set('@', path.resolve('./src'));

    // svgRule
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader');

    // svgRule
    //   .oneOf('component')
    //   .resourceQuery(/component/)
    //   .use('vue-loader-v16')
    //   .loader('vue-loader-v16')
    //   .end()
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
    //   .end()
    //   .end()
    //   .oneOf('external')
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: 'assets/[name].[hash:8].[ext]',
    //   });
    // config.module
    //   .rule('fonts')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 4096, // 小于4kb将会被打包成 base64
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         name: 'fonts/[name].[hash:8].[ext]',
    //         assetPath,
    //       },
    //     },
    //   })
    //   .end();
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 10240, // 小于4kb将会被打包成 base64
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         name: 'img/[name].[hash:8].[ext]',
    //         assetPath,
    //       },
    //     },
    //   });
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
        useSource: true,
      }),
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          bucket: {
            name: 'bucket',
            test: /[\\/]node_modules[\\/](@vue|vue-router|vuex|vue-i18n)[\\/]/,
            priority: 11,
          },
          elementPlus: {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: 10,
          },
          qiankun: {
            name: 'qiankun',
            test: /[\\/]node_modules[\\/](qiankun|single-spa)[\\/]/,
            priority: 10,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    },
  },
};
