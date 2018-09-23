import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as path from "path";
import WatchMissingNodeModulesPlugin from "../plugins/npm-auto-installer/missing-module";
import PackageInstaller from "../plugins/npm-auto-installer/installer";
import PackageInstallPlugin from "../plugins/npm-auto-installer";
const HtmlWebpackPlugin = require("html-webpack-plugin");

export class Compiler {
  private compiler: webpack.Compiler;

  constructor(expressApp: any) {
    this.compiler = webpack({
      entry: "D:\\projects\\playground\\index.js",
      mode: "development",
      plugins: [
        new HtmlWebpackPlugin({
          title: "Config Pack",
          template: require("html-webpack-template"),
          appMountId: "root"
        }),
        new PackageInstallPlugin(
          new PackageInstaller("D:\\projects\\playground\\")
        ),
        new WatchMissingNodeModulesPlugin(
          path.join("D:\\projects\\playground\\", "node_modules")
        )
      ]
    });

    expressApp.use(
      middleware(this.compiler, {
        publicPath: "/app"
      })
    );
  }
}
