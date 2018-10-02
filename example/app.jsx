import React from "react";
import styled from "react-emotion";
import AdditionalComponent from "./AdditionalComponent.jsx";
const HelloDiv = styled("div")({
  backgroundColor: "#4a90e2"
});
const HelloInnerDiv = styled("div")({
  backgroundColor: "#d0021b",
  width: "200px"
});

const App = function Home() {
  return <HelloDiv>
      <AdditionalComponent />
      <HelloInnerDiv>Hey</HelloInnerDiv>
    </HelloDiv>;
};

export default App;