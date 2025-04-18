// 方便ide配置
const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      'css': resolve('src/assets/css'),
      'img': resolve('src/assets/images')
    }
  }
}