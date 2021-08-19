var ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      })
    )
    return config
  },
}
