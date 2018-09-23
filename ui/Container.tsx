import React, { Component } from "react";
import styled from "react-emotion";
import { Flex } from "reflexbox";
import { produce } from "immer";
import ConfigState from "./state";
import { Subscribe, Provider } from "unstated";

const ContainerDiv = styled("div")`
  display: flex;
  flex-direction: row;
`;

export default class Container extends Component<{}> {
  render() {
    return (
      <Provider>
        <ContainerDiv>
          <Subscribe to={[ConfigState]}>
            {(config: ConfigState) => (
              <Flex column w="100%">
                Hello
              </Flex>
            )}
          </Subscribe>
        </ContainerDiv>
      </Provider>
    );
  }
}
