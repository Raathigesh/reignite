import React, { Component } from "react";
import { Classes, ITreeNode, Tooltip } from "@blueprintjs/core";
import { Tree, Icon } from "antd";
import "../../style-override/override.less";
import TreeViewStore from "../../store/tree-view";
import styled, { css, injectGlobal } from "react-emotion";

injectGlobal`
.ant-tree-node-content-wrapper {
  color: white !important;
}
`;

const Container = styled("div")`
  padding-left: 5px;
  min-width: 350px;
  background-color: #09141c;
  height: 100%;
`;

const TreeNodeStyle = css`
  color: white;
`;

interface Props {
  treeViewStore: TreeViewStore;
}

const TreeNode = Tree.TreeNode;

function getNodeIcon(type: "emotion" | "primitive" | "component") {
  switch (type) {
    case "emotion":
      return "highlight";
    case "primitive":
      return "build";
    case "component":
      return "appstore";
    default:
      return "appstore";
  }
}

function getComponentForNode(node: ITreeNode) {
  return (
    <TreeNode
      className={TreeNodeStyle}
      icon={<Icon type={getNodeIcon(node.type)} />}
      title={node.label}
      key={node.id || "hahaha"}
    >
      {node.childNodes.map(childNode => getComponentForNode(childNode))}
    </TreeNode>
  );
}

export default class Outline extends Component<Props> {
  render() {
    const { treeViewStore } = this.props;
    const treViewState = treeViewStore.state;
    return (
      <Container>
        {treViewState.nodes[0] && (
          <Tree
            showIcon
            defaultExpandAll
            onSelect={(keys, event) => {
              console.log(event);
              const selectedKey = keys[0];
              treeViewStore.highlightComponentInPreview(selectedKey);
            }}
          >
            {getComponentForNode(treViewState.nodes[0])}
          </Tree>
        )}
      </Container>
    );
  }
}
