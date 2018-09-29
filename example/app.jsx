import React from "react";
import styled from "react-emotion";
import AdditionalComponent from "./AdditionalComponent.jsx";
const HelloDiv = styled("div")({
  backgroundColor: "#d81f1f"
});
const HelloInnerDiv = styled("div")({
  backgroundColor: "#f5a623",
  width: "700px"
});

const App = function Home() {
  return <HelloDiv>
      <AdditionalComponent />
      <HelloInnerDiv>Hey</HelloInnerDiv>
    </HelloDiv>;
};

export default App;