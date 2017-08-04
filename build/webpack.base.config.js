const webpack = require('webpack');
const path = require('path');

/*plugins */
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const isProduction = process.env.NODE_ENV === 'production';  //在命令窗口执行命令set node_env=production ,不执行的话则为false
const publicPath = isProduction ? 'http://static.rencaijia.com/' : '/dist/';  //产品环境下采用腾讯云服务器 , 生产环境下采用本地图片

module.exports = {
  entry: {
    
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],  //扩展名，添加上会自己添加扩展名，会重写默认的extension,谨慎使用
    modules: [path.join(__dirname, 'src'), 'node_modules'],  //告诉webpack在哪里目录下搜索解析模块 ，默认为 modules: ["node_modules"]
    alias: {  //设置别名
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
          fallback: "style-loader",
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //limit参数配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
              name: 'img/[name].[ext]'  //  'img/[folder]/[name].[ext]'  按照文件夹放置图片
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //limit参数配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
              name: 'media/[name].[ext]'  //  'img/[folder]/[name].[ext]'  按照文件夹放置图片
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //limit参数配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
              name: 'font/[name].[ext]'  //  'img/[folder]/[name].[ext]'  按照文件夹放置图片
            }
          }
        ]
      }
    ]
  }
}