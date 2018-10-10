import { pubsub } from "../../server/services/event-emitter";

export default class ReactComponentHighlighter {
  public projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

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
            if (
              modules.resource &&
              modules.resource.includes(this.projectRoot)
            ) {
              console.log(modules.resource);
              pubsub.publish("FILE_CHANGE", modules.resource);
            }
          }
        );
      }
    );
  }
}
