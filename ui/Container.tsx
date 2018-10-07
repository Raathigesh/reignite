import React, { Component } from "react";
import styled from "react-emotion";
import SplitPane from "react-split-pane";
import { Provider, observer } from "mobx-react";
import CSSEditor from "./editor-components/css-editor";
import Tree from "./editor-components/tree";
import Preview from "./preview";
import { tree as treeStore } from "./store";
import "./style-override/style.css";

const ContainerDiv = styled("div")`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

interface State {
  isDragging: boolean;
}

export default class Container extends Component<State> {
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
    return (
      <Provider tree={treeStore}>
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
              <CSSEditor />
            </SplitPane>
          </SplitPane>
        </ContainerDiv>
      </Provider>
    );
  }
}
