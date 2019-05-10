const {
  override,
  useEslintRc,
  addBabelPlugin,
  enableEslintTypescript,
} = require('customize-cra')

module.exports = override(
  // 使用自定义 eslintrc
  useEslintRc(),
  // 热更新
  addBabelPlugin('react-hot-loader/babel'),
  // 开启 typescript lint
  enableEslintTypescript(),
)

// 下面注释掉的部分可以拿来启动一个完整项目
// const {
//   override,
//   addDecoratorsLegacy,
//   useEslintRc,
//   addBabelPlugin,
//   addLessLoader,
//   enableEslintTypescript,
// } = require('customize-cra')
//
// module.exports = override(
//   // 开启 Decorators
//   addDecoratorsLegacy(),
//   // 使用自定义 eslintrc
//   useEslintRc(),
//   // 热更新
//   addBabelPlugin('react-hot-loader/babel'),
//   // Less
//   addLessLoader({
//     strictMath: true,
//     noIeCompat: true,
//     localIdentName: '[local]--[hash:base64:5]',
//   }),
//   // 开启 typescript lint
//   enableEslintTypescript(),
// )
