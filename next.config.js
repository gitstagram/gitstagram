const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
        })
      )

      config.plugins.push(
        new StylelintPlugin({
          extensions: ['ts', 'tsx'],
          failOnError: false,
          fix: true,
        })
      )

      config.optimization.removeAvailableModules = false
      config.optimization.removeEmptyChunks = false
    }

    if (process.env.ANALYZE === 'true') {
      config.plugins.push(new DuplicatePackageCheckerPlugin())
    }

    return config
  },
}

module.exports =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })(nextConfig)
    : nextConfig
