import installGlobalHook from "../react-devtools/backend/installGlobalHook";
import setupBackend from "../react-devtools/backend/backend";
import Overlay from "./overlay.ts";
installGlobalHook(window);
const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
setupBackend(hook);

class Inspector {
  public dataByInstance: WeakMap<any, any> = new WeakMap();
  public instanceById: Map<any, any> = new Map();
  public rootInternalInstance: any = null;
  public helpers: any;

  constructor() {
    const overlay = new Overlay(window);
    window.addEventListener(
      "message",
      event => {
        if (event.data.highlight) {
          const internalInstance = this.instanceById.get(event.data.highlight);
          const domElement = this.helpers.getNativeFromReactElement(
            internalInstance
          );
          overlay.inspect(domElement, "Document");
        }
      },
      false
    );

    hook.sub("renderer-attached", ({ id, renderer, helpers }: any) => {
      this.helpers = helpers;
      console.log("renderer");
    });

    hook.sub("mount", ({ renderer, internalInstance, data }: any) => {
      const id = guid();
      this.dataByInstance.set(internalInstance, {
        id,
        data
      });
      this.instanceById.set(id, internalInstance);
      console.log(data);
    });

    hook.sub("root", ({ renderer, internalInstance }: any) => {
      this.rootInternalInstance = internalInstance;
      const tree = this.getTree(this.rootInternalInstance);
      parent.postMessage(
        {
          type: "reignite-tree",
          data: tree
        },
        "http://localhost:9000"
      );

      console.log(tree);
    });
  }

  getTree = (
    internalInstance: any,
    root: any = {
      id: "",
      name: "root",
      children: []
    }
  ) => {
    const item = this.dataByInstance.get(internalInstance);
    const nodeData = item.data;
    const node = {
      id: item.id,
      type: nodeData.nodeType,
      name: nodeData.name,
      children: []
    } as any;
    root.children.push(node);

    if (nodeData.children instanceof String) {
      node.children.push({
        name: nodeData.children
      });
    } else {
      nodeData.children &&
        nodeData.children.forEach &&
        nodeData.children.forEach((child: any) => {
          this.getTree(child, node);
        });
    }

    return root;
  };
}

new Inspector();

function guid(): string {
  return (
    "g" +
    Math.random()
      .toString(16)
      .substr(2)
  );
}
