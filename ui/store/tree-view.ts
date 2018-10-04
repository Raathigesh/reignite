import { Container } from "unstated";
import { onComponentTree, highlightComponent } from "../post-message";

interface TreeNode {
  id: string;
  childNodes: TreeNode[];
}

interface State {
  nodes: TreeNode[];
  allIds: string[];
  activeNodePath: string | null;
}

export default class TreeViewStore extends Container<State> {
  state = {
    nodes: [],
    allIds: [],
    activeNodePath: null
  };

  constructor() {
    super();

    onComponentTree(treeData => {
      const nodeTree = this.mapToUIState(treeData);
      this.setState({
        nodes: [nodeTree],
        allIds: this.findAllIds(nodeTree)
      });
    });
  }

  highlightComponentInPreview(id: string) {
    highlightComponent(id);

    const node = this.findNodeById(id);
    this.setState({
      activeNodePath: node.path
    });
  }

  findNodeById(id: string, node: TreeNode = this.state.nodes[0]) {
    if (node.id === id) {
      return node;
    }

    for (let child of node.childNodes) {
      const result = this.findNodeById(id, child);
      if (result) {
        return result;
      }
    }
  }

  findAllIds(node: TreeNode, allIds: string[] = []) {
    allIds.push(node.id);

    for (let child of node.childNodes) {
      return this.findAllIds(child, allIds);
    }

    return allIds;
  }

  private mapToUIState(reactTree: any) {
    return {
      type: reactTree.type,
      label: reactTree.label,
      path: reactTree.path,
      id: reactTree.id,
      hasCaret: reactTree.childNodes.length > 0,
      childNodes: reactTree.childNodes.map(node => this.mapToUIState(node))
    };
  }
}
