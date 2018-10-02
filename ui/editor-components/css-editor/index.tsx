import React, { Component } from "react";
import styled from "react-emotion";
import gql from "graphql-tag";
import { graphql, Mutation, Query } from "react-apollo";
import { groupBy } from "ramda";
import CHANGE_COLOR from "./update-css-variable.gql";
import GET_CSS_PROPERTIES from "./fetch-css-properties.gql";
import PropertiesPanel from "./properties-panel";
import { findRoots, getDisplayName } from "../../tree-walker";

const Container = styled("div")`
  background-color: #09141c;
  padding: 10px;
  width: 350px;
`;

interface CSSVariable {
  styleName: string;
  name: string;
  value: any;
  fieldType: string;
}

interface Props {
  path: string;
}

class CSSEditor extends Component<Props> {
  getPath = () => {
    if (!this.props.path) {
      return null;
    }
    return this.props.path.split("#")[0];
  };

  getDeclarationName = () => {
    if (!this.props.path) {
      return null;
    }
    return this.props.path.split("#")[1];
  };

  render() {
    if (!this.getPath()) {
      return <Container />;
    }
    return (
      <Container>
        <Query
          query={GET_CSS_PROPERTIES}
          variables={{ filePath: this.getPath() }}
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

                  return Object.entries(groups)
                    .filter(([key]) => key === this.getDeclarationName())
                    .map(([key, value]) => (
                      <div>
                        <PropertiesPanel
                          properties={value}
                          onChange={(name: string, value: any) => {
                            updateCSSVariable({
                              variables: {
                                declarationName: key,
                                filePath: this.getPath(),
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
    );
  }
}

export default CSSEditor;
