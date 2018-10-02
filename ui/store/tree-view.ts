import { Container } from "unstated";
import { onComponentTree, highlightComponent } from "../post-message";
import { ITreeNode, IconName } from "@blueprintjs/core";

interface State {
  nodes: ITreeNode[];
  activeNodePath: string | null;
}

export default class TreeViewStore extends Container<State> {
  state = {
    nodes: [],
    activeNodePath: null
  };

  constructor() {
    super();

    onComponentTree(treeData => {
      this.setState({
        nodes: [this.mapToUIState(treeData)]
      });
    });
  }

  public handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
    this.setState({
      activeNodePath: nodeData.path
    });

    highlightComponent(nodeData.id);
  };

  public handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  public handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }

  private mapToUIState(reactTree: any) {
    return {
      label: reactTree.label,
      path: reactTree.path,
      id: reactTree.id,
      hasCaret: reactTree.childNodes.length > 0,
      isExpanded: true,
      icon:
        reactTree.type === "div"
          ? ("helper-management" as IconName)
          : ("folder-close" as IconName),
      childNodes: reactTree.childNodes.map(node => this.mapToUIState(node))
    };
  }
}
