import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as path from "path";
import WatchMissingNodeModulesPlugin from "../plugins/npm-auto-installer/missing-module";
import PackageInstaller from "../plugins/npm-auto-installer/installer";
import PackageInstallPlugin from "../plugins/npm-auto-installer";
import ReactComponentHighlighter from "../plugins/react-component-highlighter";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
var HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

export class Compiler {
  private compiler: webpack.Compiler;

  constructor(expressApp: any, projectRoot: string) {
    this.compiler = webpack({
      entry: [
        path.join(projectRoot, "index.jsx"),
        "webpack-hot-middleware/client"
      ],
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: "Config Pack",
          template: require("html-webpack-template"),
          appMountId: "root"
        }),
        new PackageInstallPlugin(new PackageInstaller(projectRoot)),
        new WatchMissingNodeModulesPlugin(
          path.join(projectRoot, "node_modules")
        ),
        new webpack.HotModuleReplacementPlugin(),
        new ReactComponentHighlighter(),
        new WebpackBar(),
        new HtmlWebpackIncludeAssetsPlugin({
          assets: ["./client-script.js"],
          append: true
        })
      ]
    });

    expressApp.use(
      middleware(this.compiler, {
        publicPath: "/"
      })
    );

    expressApp.use(function(req: any, res: any, next: any) {
      if (req.originalUrl.includes("client-script.js")) {
        const filePath = path.join(__dirname, "./client-script.js");
        res.sendFile(filePath);
      } else {
        next();
      }
    });

    expressApp.use(require("webpack-hot-middleware")(this.compiler));
  }
}
