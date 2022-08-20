
const path = require('path')
module.exports = {
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',//自动引入，在每个页面引入scss
      patterns: [path.resolve(__dirname, 'src/assets/common.scss')]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',//后台服务器地址
        changeOrigin: true,//target为域名时必须设置此项
        pathRewrite: {
          '^/api': '',//本地地址
        },
      }
    }
  }
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require("postcss-plugin-px2rem")({
  //           rootValue: 37.5, //设计稿宽度 37.5*10=375
  //         })
  //       ]
  //     }
  //   }
  // }
}
