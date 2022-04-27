const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,

  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    static: {
      directory: path.resolve(__dirname, `public`),
      watch: true,
    },
    devMiddleware: {
      publicPath: `http://localhost:8080`,
    },
  }
};

