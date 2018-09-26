import React from "react";
import styled from "react-emotion";
const HelloDiv = styled("div")({
  backgroundColor: "#417505"
});
const HelloInnerDiv = styled("div")({
  backgroundColor: "#f5a623",
  width: "700px"
});

const App = function Home() {
  return <HelloDiv>
      <HelloInnerDiv>Hey</HelloInnerDiv>
      Hello
    </HelloDiv>;
};

export default App;