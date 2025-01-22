const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const deps = require('./package.json').dependencies;
const basePaths = require('./public/settings.js');

module.exports = (env, argv) => {
  const buildDate = new Date();

  return {
    entry: `./src/entry.ts`,
    mode: 'production',
    devServer: {
      port: 8030,
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      filename: '[name].bundle.js', // Output filename using [name] placeholder
      path: path.resolve(__dirname, 'dist'),
      publicPath: `${basePaths.remoteUrls.Invoice}/`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.(sass|less|css|scss)$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        BUILD_DATE: buildDate.toISOString()
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new ModuleFederationPlugin({
        name: 'Invoicing',
        exposes: {
          './App': './src/components/App'
        },
        remotes: {
          StoreApp: `Store@${basePaths.remoteUrls.Store}`
        },
        filename: 'remoteEntry.js',
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom']
          },
          'react-router': {
            singleton: true,
            eager: false,
            requiredVersion: deps['react-router']
          },
          'react-router-dom': {
            singleton: true,
            eager: false,
            requiredVersion: deps['react-router-dom']
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: `./public/index.html`
      })
    ]
  };
};
