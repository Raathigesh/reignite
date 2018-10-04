import React, { Component } from "react";
import styled from "react-emotion";
import { Flex } from "reflexbox";
import { produce } from "immer";
import TreeViewStore from "./store/tree-view";
import { Subscribe, Provider } from "unstated";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import SplitPane from "react-split-pane";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

import CSSEditor from "./editor-components/css-editor";
import Tree from "./editor-components/tree";
import Preview from "./preview";
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
      <ApolloProvider client={client}>
        <Provider>
          <ContainerDiv>
            <Subscribe to={[TreeViewStore]}>
              {(config: TreeViewStore) => (
                <SplitPane
                  split="vertical"
                  defaultSize={400}
                  onDragStarted={this.handleDragStart}
                  onDragFinished={this.handleDragEnd}
                >
                  <Tree treeViewStore={config} />
                  <SplitPane
                    split="vertical"
                    defaultSize={350}
                    primary="second"
                    onDragStarted={this.handleDragStart}
                    onDragFinished={this.handleDragEnd}
                  >
                    <Preview shouldShow={!this.state.isDragging} />
                    <CSSEditor path={config.state.activeNodePath} />
                  </SplitPane>
                </SplitPane>
              )}
            </Subscribe>
          </ContainerDiv>
        </Provider>
      </ApolloProvider>
    );
  }
}
