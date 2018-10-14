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
  background-color: #f5a623;
`;

const App = function Home() {
  return (
    <HelloDiv>
      <AdditionalComponent />
      <HelloInnerDiv>Hey</HelloInnerDiv>
      <Bar>Hello</Bar>
    </HelloDiv>
  );
};

export default App;
