const {
  override,
  addDecoratorsLegacy,
  addBabelPlugin,
  // addLessLoader,
  disableEsLint,
} = require('customize-cra')

module.exports = override(
  // 开启 Decorators
  addDecoratorsLegacy(),
  // 热更新
  addBabelPlugin('react-hot-loader/babel'),
  // Less
  // addLessLoader({
  //   strictMath: true,
  //   noIeCompat: true,
  //   localIdentName: '[local]--[hash:base64:5]',
  // }),
  // 将 eslint 移入 commit 阶段
  disableEsLint(),
)
