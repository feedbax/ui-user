/* eslint-disable */

const webpack = require('webpack');

function makeHash(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = function override(config, _env) {
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env.HASH': JSON.stringify(makeHash(64))
    })
  ];

  return config;
};
