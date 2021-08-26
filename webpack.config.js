const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const mode = env.production ? 'production' : 'development';

  return {
    mode,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Goods Task',
        template: 'src/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
