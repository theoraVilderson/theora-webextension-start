const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function srcPath(...args) {
  return path.resolve(__dirname, "src", ...args);
}
function distPath(...args) {
  return path.resolve(__dirname, "app", "dist", ...args);
}
const config = {
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  devtool: "inline-source-map",
};

const popupPageScript = Object.assign({}, config, {
  name: "popupPage",
  entry: srcPath("pages", "popup", "index"),
  output: {
    filename: "index.js",
    path: distPath("pages", "popup"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "document title",
      filename: "html_pop.html",
      template: srcPath("pages", "popup", "html_pop_template.html"),
    }),
  ],
});
const backgroundScript = Object.assign({}, config, {
  name: "backgroundScript",
  entry: srcPath("backgroundServices", "controller"),
  output: {
    filename: "controller.js",
    path: distPath("backgroundServices"),
  },
});
const contentScript = Object.assign({}, config, {
  name: "contentScript",
  entry: srcPath("contentScripts", "webScript"),
  output: {
    filename: "webScript.js",
    path: distPath("contentScripts"),
  },
});

module.exports = [popupPageScript, backgroundScript, contentScript];
