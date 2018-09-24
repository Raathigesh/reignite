import React, { Component } from "react";
import styled from "react-emotion";
import { Flex } from "reflexbox";
import { produce } from "immer";
import ConfigState from "./state";
import { Subscribe, Provider } from "unstated";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

import CSSEditor from "./editor-components/css-editor";

const ContainerDiv = styled("div")`
  display: flex;
  flex-direction: row;
`;

export default class Container extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <ContainerDiv>
            <Subscribe to={[ConfigState]}>
              {(config: ConfigState) => (
                <Flex column w="100%">
                  <iframe
                    src="http://localhost:4000"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  />
                  <CSSEditor />
                </Flex>
              )}
            </Subscribe>
          </ContainerDiv>
        </Provider>
      </ApolloProvider>
    );
  }
}
