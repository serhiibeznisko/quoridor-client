const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
// Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/.env";

  // We are concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + "." + env.BUILD_ENV;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: [
      path.join(__dirname, "src", "index.js")
    ],
    output: {
      filename: "[name].[chunkhash:4].js",
      path: path.join(__dirname, "dist"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              }
            },
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        // Loading Images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
            "file-loader",
          ],
        },
        // Loading Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            "file-loader",
          ],
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
      overlay: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        // favicon: "./src/assets/img/favicon-32x32.png"
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
