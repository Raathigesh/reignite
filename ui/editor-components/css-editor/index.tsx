import React from "react";
import styled from "react-emotion";
import Draggable from "react-draggable";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";
import { groupBy } from "ramda";
import CHANGE_COLOR from "./update-css-variable.gql";
import PropertiesPanel from "./properties-panel";

const Container = styled("div")`
  height: 400px;
  width: 200px;
`;

interface CSSVariable {
  styleName: string;
  name: string;
  value: any;
  fieldType: string;
}

interface Props {
  data: {
    refetch: () => void;
    loading: boolean;
    cssDeclarations: CSSVariable[];
  };
}

function CSSEditor({
  data,
  data: { loading, refetch, cssDeclarations }
}: Props) {
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
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
                      filePath: "D:\\projects\\reimagine\\example\\app.jsx",
                      propertyName: "backgroundColor",
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
    </Container>
  );
}

const ITEMS_QUERY = gql`
  query ItemsQuery {
    cssDeclarations(filePath: "D://projects//reimagine//example//app.jsx") {
      styleName
      name
      value
      fieldType
    }
  }
`;

export default graphql(ITEMS_QUERY)(CSSEditor);
