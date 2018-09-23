// Most of the code is shamlessly copied from github.com/k15a/playgrounds/blob/master/packages/playgrounds-server/
// Thank you k15a for your work

export default class WatchMissingNodeModulesPlugin {
  public nodeModulesPath: string;
  constructor(nodeModulesPath: string) {
    this.nodeModulesPath = nodeModulesPath;
  }

  apply(compiler: any) {
    compiler.hooks.emit.tap(
      "WatchMissingNodeModulesPlugin",
      (compilation: any) => {
        const missingDependencies = Array.from(compilation.missingDependencies);

        const isNodeModule = missingDependencies.some((file: string) =>
          file.includes(this.nodeModulesPath)
        );

        if (isNodeModule) {
          compilation.contextDependencies.add(this.nodeModulesPath);
        }
      }
    );
  }
}
