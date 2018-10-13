import React, { Component } from "react";
import { Tree, Icon } from "antd";
import "../../style-override/override.less";
import TreeViewStore from "../../store/tree";
import styled, { css, injectGlobal } from "react-emotion";
import { inject, observer } from "mobx-react";
import TreeNodeStore from "../../store/tree-node";
import ActionPanel from "./action-panel";

injectGlobal`
.ant-tree-node-content-wrapper {
  color: white !important;
}

.ant-tree li .ant-tree-node-content-wrappe {
  padding: 0px 0px  !important;
}

.ant-tree li ul {
  padding: 0 0 0 10px !important;
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
  tree?: TreeViewStore;
}

const TreeContainer = observer(Tree);
const TreeNode = observer(Tree.TreeNode);

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

function GetNodeComponent(node: TreeNodeStore) {
  return (
    <TreeNode
      className={TreeNodeStyle}
      icon={<Icon type={getNodeIcon(node.type)} />}
      title={node.label}
      key={node.id || "hahaha"}
    >
      {node.childNodes.map(childNode => GetNodeComponent(childNode))}
    </TreeNode>
  );
}

@inject("tree")
@observer
export default class Outline extends Component<Props> {
  render() {
    const { tree } = this.props;
    if (!tree) return null;
    return (
      <Container>
        <ActionPanel />
        {tree.nodes.length && (
          <TreeContainer
            showIcon
            defaultExpandAll
            selectedKeys={[tree.selectedNode]}
            onSelect={keys => {
              const selectedKey = keys[0];
              tree.highlightComponentInPreview(selectedKey);
            }}
          >
            {GetNodeComponent(tree.nodes[0])}
          </TreeContainer>
        )}
      </Container>
    );
  }
}
