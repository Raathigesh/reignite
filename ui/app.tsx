import React from "react";
import { observer, inject } from "mobx-react";
import styled from "react-emotion";
import SplitPane from "react-split-pane";
import CSSEditor from "./editor-components/css-editor";
import Tree from "./editor-components/tree";
import Preview from "./preview";
import TreeViewStore from "./store/tree";

const ContainerDiv = styled("div")`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

interface State {
  isDragging: boolean;
}

interface Props {
  tree?: TreeViewStore;
}

@inject("tree")
@observer
export default class App extends React.Component<Props, State> {
  state = {
    isDragging: false
  };

  handleDragStart = () => {
    this.setState({
      isDragging: true
    });
  };

  handleDragEnd = () => {
    this.setState({
      isDragging: false
    });
  };

  render() {
    const { tree } = this.props;

    if (!tree) return null;

    const { activeComponent, activeNodePath } = tree;
    return (
      <ContainerDiv>
        <SplitPane
          split="vertical"
          defaultSize={400}
          onDragStarted={this.handleDragStart}
          onDragFinished={this.handleDragEnd}
        >
          <Tree />
          <SplitPane
            split="vertical"
            defaultSize={350}
            primary="second"
            onDragStarted={this.handleDragStart}
            onDragFinished={this.handleDragEnd}
          >
            <Preview shouldShow={!this.state.isDragging} />
            <CSSEditor
              activeComponent={activeComponent}
              activeNodePath={activeNodePath}
            />
          </SplitPane>
        </SplitPane>
      </ContainerDiv>
    );
  }
}
