const path = require('path');

module.exports = [
  {
    test: /\.less$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          import: true,
          modules: {
            localIdentName: "[name]_[local]__[hash:base64:5]",
          },
        },
      },
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },
]