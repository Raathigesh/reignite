import React, { Component } from "react";
import styled from "react-emotion";
import { Flex } from "reflexbox";
import { produce } from "immer";
import TreeViewStore from "./store/tree-view";
import { Subscribe, Provider } from "unstated";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

import CSSEditor from "./editor-components/css-editor";
import Tree from "./editor-components/tree";
import Preview from "./preview";

const ContainerDiv = styled("div")`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default class Container extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <ContainerDiv>
            <Subscribe to={[TreeViewStore]}>
              {(config: TreeViewStore) => (
                <Flex w="100%">
                  <Tree treeViewStore={config} />
                  <Preview />
                  <CSSEditor path={config.state.activeNodePath} />
                </Flex>
              )}
            </Subscribe>
          </ContainerDiv>
        </Provider>
      </ApolloProvider>
    );
  }
}
