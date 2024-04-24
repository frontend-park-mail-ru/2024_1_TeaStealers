const path = require('path');

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    "plugins": [
        "@babel/plugin-syntax-jsx",
        ["@babel/plugin-transform-react-jsx", {
        "pragma": "h"
      }]
      ],
};