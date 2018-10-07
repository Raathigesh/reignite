import React, { Component } from "react";
import styled from "react-emotion";
import PropertiesPanel from "./properties-panel";
import { Subscribe } from "unstated";
import StyleEditor from "../../store/style-editor";

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
        <Subscribe to={[StyleEditor]}>
          {(styleEditorState: StyleEditor) => {
            return styleEditorState.state.styledComponents.map(component => (
              <div>{component.name}</div>
            ));
          }}
        </Subscribe>
      </Container>
    );
  }
}

export default CSSEditor;
