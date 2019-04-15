const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: { app: isDev ? ["./src/main.js"] : ["babel-polyfill", "./src/main.js"] },
  output: {
    filename: "js/[name].[hash:5].bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    chunkFilename: './js/[name].[hash:6].bundle.js',
  },
  optimization: { // 分离 module 代码
    splitChunks: {
      chunks: 'all',
      name: "common",
      maxAsyncRequests: 5,
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          (isDev ? 'vue-style-loader' : ({
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: isDev,
            }
          })),
          // &localIdentName=[name]_[local]-[hash:base64:5]
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
              config: {
                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: isDev }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              // resources: './path/to/resources.scss',
              // Or array of paths
              resources: ['./static/css/common.scss']
            }
          },
        ]
      },
      {
        test: /\.(html)/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|svg|png|gif|jpeg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: "img/[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)),
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
      favicon: './public/favicon.ico',
      removeAttributeQuotes: !isDev, // 去除属性双引号
      collapseWhitespace: !isDev // 去掉换行
    }),
    new CleanWebpackPlugin({
      path: path.join(__dirname, "dist")
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: !isDev
    }),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
      vue$: isDev
        ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.js',
      '@': path.resolve("src")
    },
    extensions: ['.js', '.vue', 'scss', 'css', 'json']
  },
  devServer: {
    port: 1214,
    host: "0.0.0.0",
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
  },

}