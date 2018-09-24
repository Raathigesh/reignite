// https://github.com/loogle18/xray-react/blob/master/lib/plugins.js

export default class ReactComponentHighlighter {
  apply(compiler: any) {
    compiler.hooks.afterOptimizeModules.tap(
      "ReactComponentHighlighter",
      (modules: any) => {
        for (let { resource } of modules) {
        }
      }
    );
  }
}
