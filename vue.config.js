/* eslint-disable */
const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        '@': path.resolve(__dirname, 'src/')
      }
    }
  }
}
