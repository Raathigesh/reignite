import { onComponentTree, highlightComponent } from "../post-message";
import TreeNode from "./tree-node";
import { observable, IObservableArray } from "mobx";

export default class TreeViewStore {
  @observable
  public nodes: IObservableArray<TreeNode> = observable([]);
  @observable
  public allIds: IObservableArray<string> = observable([]);
  @observable
  public selectedNode: string;
  @observable
  public activeNodePath: string | null;
  @observable
  public activeComponent: string | null;

  constructor() {
    onComponentTree(treeData => {
      const nodeTree = this.mapToUIState(treeData);
      this.nodes.clear();
      this.nodes.push(...[nodeTree]);

      this.allIds.push(...this.findAllIds(nodeTree));
    });
  }

  highlightComponentInPreview(id: string) {
    //this.selectedNode = id;
    highlightComponent(id);
    /*  const node = this.findNodeById(id);
    if (node) {
      this.setNodePath(node.path);
    } */
  }

  setNodePath(path: string) {
    console.log("📍 Current Path", path);

    if (!path) {
      this.activeComponent = null;
      this.activeNodePath = null;
    }
    this.activeNodePath = path.split("#")[0];
    this.activeComponent = path.split("#")[1];
  }

  findNodeById(id: string, node: TreeNode = this.nodes[0]): TreeNode | null {
    if (node.id === id) {
      return node;
    }
    for (let child of node.children) {
      const result = this.findNodeById(id, child);
      if (result) {
        return result;
      }
    }
    return null;
  }

  findAllIds(node: TreeNode, allIds: string[] = []): string[] {
    allIds.push(node.id);
    for (let child of node.children) {
      return this.findAllIds(child, allIds);
    }
    return allIds;
  }

  private mapToUIState(reactTree: any) {
    return new TreeNode({
      type: reactTree.type,
      label: reactTree.name,
      path: reactTree.path,
      id: reactTree.id,
      hasCaret: reactTree.children.length > 0,
      childNodes: reactTree.children.map(node => this.mapToUIState(node))
    });
  }
}
