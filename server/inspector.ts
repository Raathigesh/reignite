import installGlobalHook from "../react-devtools/backend/installGlobalHook";
import setupBackend from "../react-devtools/backend/backend";
installGlobalHook(window);
const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
setupBackend(hook);

class Inspector {
  public dataByInstance: WeakMap<any, any> = new WeakMap();
  public rootInternalInstance: any = null;

  constructor() {
    hook.sub("renderer-attached", ({ id, renderer, helpers }: any) => {
      console.log("renderer");
    });

    hook.sub("mount", ({ renderer, internalInstance, data }: any) => {
      this.dataByInstance.set(internalInstance, data);
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
      name: "root",
      children: []
    }
  ) => {
    const nodeData = this.dataByInstance.get(internalInstance);
    const node = {
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
