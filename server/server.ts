import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as path from "path";
import WatchMissingNodeModulesPlugin from "../plugins/npm-auto-installer/missing-module";
import PackageInstaller from "../plugins/npm-auto-installer/installer";
import PackageInstallPlugin from "../plugins/npm-auto-installer";
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
              presets: ["@babel/preset-react", "@babel/preset-env"]
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
        new webpack.HotModuleReplacementPlugin()
      ]
    });

    expressApp.use(
      middleware(this.compiler, {
        publicPath: "/"
      })
    );

    expressApp.use(require("webpack-hot-middleware")(this.compiler));
  }
}
