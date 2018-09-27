import React, { Component } from "react";
import styled from "react-emotion";
import Draggable from "react-draggable";
import gql from "graphql-tag";
import { graphql, Mutation, Query } from "react-apollo";
import { groupBy } from "ramda";
import CHANGE_COLOR from "./update-css-variable.gql";
import GET_CSS_PROPERTIES from "./fetch-css-properties.gql";
import PropertiesPanel from "./properties-panel";
import { findRoots, getDisplayName } from "../../tree-walker";

const Container = styled("div")`
  background-color: #f6f6f6;
  padding: 10px;
  width: 200px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99999;
`;

interface CSSVariable {
  styleName: string;
  name: string;
  value: any;
  fieldType: string;
}

interface Props {}

interface State {
  path: string | null;
}

class CSSEditor extends Component<Props, State> {
  state = {
    path: null
  };
  componentDidMount() {
    window.addEventListener("message", (event: any) => {
      if (event.data.type === "reignite-preview") {
        const path = event.data.path.split("#")[0];
        this.setState({
          path
        });
      }
    });
  }

  componentDidUpdate() {}

  render() {
    if (!this.state.path) {
      return null;
    }
    return (
      <Draggable handle=".handle">
        <Container>
          <Query
            query={GET_CSS_PROPERTIES}
            variables={{ filePath: this.state.path }}
          >
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return <div>Loading</div>;
              }

              let cssDeclarations: any = [];

              if (data) {
                cssDeclarations = data.cssDeclarations;
              }

              return (
                <Mutation mutation={CHANGE_COLOR}>
                  {updateCSSVariable => {
                    const groups = groupBy(
                      (cssVariable: CSSVariable) => cssVariable.styleName
                    )(cssDeclarations);

                    return Object.entries(groups).map(([key, value]) => (
                      <div>
                        <div>{key}</div>
                        <PropertiesPanel
                          properties={value}
                          onChange={(name: string, value: any) => {
                            updateCSSVariable({
                              variables: {
                                declarationName: key,
                                filePath: this.state.path,
                                propertyName: name,
                                propertyValue: value
                              }
                            }).then(() => {
                              refetch();
                            });
                          }}
                        />
                      </div>
                    ));
                  }}
                </Mutation>
              );
            }}
          </Query>
        </Container>
      </Draggable>
    );
  }
}

export default CSSEditor;
