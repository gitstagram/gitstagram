const { exec } = require('child_process')
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

if (process.env.NODE_ENV === 'production') {
  // Force sentry install if postinstall scripts did not run
  const installSentry = path.join(
    'node_modules',
    '@sentry',
    'cli',
    'scripts',
    'install.js'
  )
  exec(`node ${installSentry}`, (error, stdout, stderr) => {
    if (error) console.log(`Sentry install ERROR  - ${error.message}`)
    if (stderr) console.log(`Sentry install STDERR  - ${stderr}`)
    if (stdout) console.log(`Sentry install STDOUT  - ${stdout}`)
  })
}

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

const moduleExports =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })(nextConfig)
    : nextConfig

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports =
  process.env.NODE_ENV === 'development'
    ? // skip Sentry if development mode
      moduleExports
    : // Make sure adding Sentry options is the last code to run before exporting, to
      // ensure that your source maps include changes from all other Webpack plugins
      withSentryConfig(moduleExports, SentryWebpackPluginOptions)
