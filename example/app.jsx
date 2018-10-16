import React from "react";
import styled from "styled-components";
import AdditionalComponent from "./AdditionalComponent.jsx";
const HelloDiv = styled("div")`
  background-color: #7ed321;
  color: white;
`;
const HelloInnerDiv = styled("div")`
  background-color: #bd4040;

  width: 505px;
  border: 5px;
`;
const Bar = styled("button")`
  background-color: #ce8080;
`;

const App = function Home() {
  return (
    <HelloDiv>
      <HelloInnerDiv>
        <Bar>Hello</Bar>
        <AdditionalComponent />
      </HelloInnerDiv>
    </HelloDiv>
  );
};

export default App;
