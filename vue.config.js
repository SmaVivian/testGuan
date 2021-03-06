const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/yourProjectName/'
  //   : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // outputDir: 'demo',
  configureWebpack: config => {
    // 确保静态资源
    config.resolve.extensions = ['.js', '.vue', '.json', '.css']
    config.plugins.push(
      new CopyWebpackPlugin([{ from: 'public/', to: 'public' }]),
    )
    config.externals = {
      "CKEDITOR": "window.CKEDITOR"
    }
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    //   new TerserPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true, // Must be set to true if using source-maps in production
    //     terserOptions: {
    //       compress: {
    //         drop_console: true,
    //         drop_debugger: true
    //       }
    //     }
    //   })
    // } else {
    //   // 为开发环境修改配置...
    // }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@icons', resolve('icons'))
      .set('@assets', resolve('src/assets'))
      .set('@images', resolve('src/assets/images'))
      .set('@cmp', resolve('src/components'))
      .set('@views', resolve('src/views'))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  css: {
    sourceMap: true,  // 查看css源文件
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/mixin.scss";
        `
      }
      // less: {
      //   modifyVars: {
      //     /* less 变量覆盖，用于自定义 ant design 主题 */

      //     /*
      //     'primary-color': '#F5222D',
      //     'link-color': '#F5222D',
      //     'border-radius-base': '4px',
      //     */
      //   },
      //   javascriptEnabled: true,
      // }
    }
  },

  devServer: {
    port: 8080,
    proxy: {
      // '/singleMuseum': {
      //   target: 'http://192.168.5.14:8080',  // 测试环境
      //   // target: 'http://192.168.5.14:8888',  // 程荣凯
      //   // target: 'http://192.168.5.89:8080',  // 陈诗雅
      //   ws: false,
      //   changeOrigin: true
      // },
      '/vivi': {
        target: 'https://easy-mock.com/mock/5c3c2ce0de22053ce38a84de', //请求本地 需要jeecg-boot后台项目
        ws: false,
        changeOrigin: true
      },
    }
  },

  lintOnSave: undefined
}