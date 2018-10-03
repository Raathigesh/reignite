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
`;

const TreeNodeStyle = css`
  color: white;
`;

interface Props {
  treeViewStore: TreeViewStore;
}

const TreeNode = Tree.TreeNode;

function getComponentForNode(node: ITreeNode) {
  return (
    <TreeNode
      className={TreeNodeStyle}
      icon={<Icon type="smile-o" />}
      title={node.label}
      key="0-0"
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
        <Tree showIcon defaultExpandAll defaultSelectedKeys={[]}>
          {treViewState.nodes.map((node: ITreeNode) => {
            return getComponentForNode(node);
          })}
        </Tree>
      </Container>
    );
  }
}
