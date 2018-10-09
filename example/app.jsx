import React from "react";
import styled from "react-emotion";
import AdditionalComponent from "./AdditionalComponent.jsx";
const HelloDiv = styled("div")`
  background-color: #7ed321;
`;
const HelloInnerDiv = styled("div")`
  background-color: #7ed321;
  width: 400px;
`;

const App = function Home() {
  return <HelloDiv>
      <AdditionalComponent />
      <HelloInnerDiv>Hey</HelloInnerDiv>
    </HelloDiv>;
};

export default App;