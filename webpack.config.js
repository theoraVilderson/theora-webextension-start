const path = require("path");

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
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
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
