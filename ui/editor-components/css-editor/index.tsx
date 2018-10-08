import React, { Component } from "react";
import styled from "react-emotion";
import { Query } from "react-apollo";
import PropertiesPanel from "./properties-panel";
import GET_CSS_PROPERTIES from "./fetch-css-properties.gql";
import StyleEditor from "../../store/style-editor";
import ComponentFile from "../../../server/api/component-file/type";

const Container = styled("div")`
  background-color: #09141c;
  padding: 10px;
  width: 350px;
  height: 100%;
`;

interface CSSVariable {
  styleName: string;
  name: string;
  value: any;
  fieldType: string;
}

interface Props {
  activeNodePath: string | null;
  activeComponent: string | null;
}

class CSSEditor extends Component<Props> {
  getPropertiesPanel = (data: { getStyledComponents: ComponentFile }) => {
    const styledComponent = data.getStyledComponents.styledComponents.find(
      component => component.name === this.props.activeComponent
    );

    if (!styledComponent) {
      return [];
    }

    return styledComponent.declarations;
  };

  render() {
    if (!this.props.activeNodePath) {
      return <Container />;
    }

    return (
      <Container>
        <Query
          query={GET_CSS_PROPERTIES}
          variables={{ filePath: this.props.activeNodePath }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <div>
                <PropertiesPanel
                  properties={this.getPropertiesPanel(data)}
                  onChange={() => {}}
                />
              </div>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default CSSEditor;
