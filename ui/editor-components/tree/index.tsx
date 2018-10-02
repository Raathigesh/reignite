import React, { Component } from "react";
import { Classes, Icon, ITreeNode, Tooltip, Tree } from "@blueprintjs/core";
import TreeViewStore from "../../store/tree-view";
import styled from "react-emotion";

const Container = styled("div")`
  padding-left: 5px;
  min-width: 350px;
  background-color: #09141c;
`;

interface Props {
  treeViewStore: TreeViewStore;
}

export default class Outline extends Component<Props> {
  render() {
    const { treeViewStore } = this.props;
    const treViewState = treeViewStore.state;
    return (
      <Container>
        <Tree
          className={Classes.DARK}
          contents={treViewState.nodes}
          onNodeClick={treeViewStore.handleNodeClick}
          onNodeCollapse={treeViewStore.handleNodeCollapse}
          onNodeExpand={treeViewStore.handleNodeExpand}
        />
      </Container>
    );
  }
}
