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
