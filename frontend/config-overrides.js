const { override, addWebpackAlias, addLessLoader, addWebpackModuleRule,
} = require('customize-cra');
const path = require('path');

const lessRegex = /\.less$/;

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, "./src/components"),
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  addWebpackModuleRule({
    test: lessRegex,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        modules: true,
      }
    }, 'less-loader'],
  }),
)