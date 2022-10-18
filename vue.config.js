const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require('webpack');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/tarkamvue/' : '/',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer","Buffer"],
      })
    ],
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "crypto": require.resolve("crypto-browserify"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
      }
    },
    devServer: {
      proxy: {
        '/players': {
          target: 'http://localhost:3000',
        },
      },
    },
  },
})
