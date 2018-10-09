// https://github.com/loogle18/xray-react/blob/master/lib/plugins.js

export default class ReactComponentHighlighter {
  apply(compiler: any, compilation: any) {
    compiler.hooks.compilation.tap(
      "ReactComponentHighlighter",
      (compilation: any) => {
        compilation.hooks.afterOptimizeModules.tap(
          "ReactComponentHighlighter",
          (modules: any) => {
            for (let { resource } of modules) {
            }
          }
        );

        //buildModule
        compilation.hooks.buildModule.tap(
          "ReactComponentHighlighter",
          (modules: any) => {
            console.log(modules);
          }
        );
      }
    );
  }
}
