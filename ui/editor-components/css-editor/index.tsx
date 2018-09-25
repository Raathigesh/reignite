import React from "react";
import styled from "react-emotion";
import Draggable from "react-draggable";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";
import CHANGE_COLOR from "./update-css-variable.gql";
import { ChromePicker } from "react-color";

const Container = styled("div")`
  height: 400px;
  width: 200px;
  background-color: green;
`;

function CSSEditor(props) {
  console.log(props);
  return (
    <Container>
      <Mutation mutation={CHANGE_COLOR}>
        {(updateCSSVariable, { data }) => (
          <ChromePicker
            onChange={e => {
              updateCSSVariable({
                variables: {
                  filePath: "D:\\projects\\reimagine\\example\\app.jsx",
                  propertyName: "backgroundColor",
                  propertyValue: e.hex
                }
              });
            }}
          />
        )}
      </Mutation>
    </Container>
  );
}

const ITEMS_QUERY = gql`
  query ItemsQuery {
    cssDeclarations(filePath: "D://projects//reimagine//example//index.jsx") {
      name
      value
    }
  }
`;

export default graphql(ITEMS_QUERY)(CSSEditor);