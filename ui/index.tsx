import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import { hot } from "react-hot-loader";
import Container from "./Container";

import "@blueprintjs/core/lib/css/blueprint.css";
require("typeface-karla");

injectGlobal`
body {
    margin: 0;
    overflow: hidden;
    font-family: 'Karla', sans-serif !important;
}

:focus {
    outline: #d1d1d1 auto 2px;
}
`;

const HotContainer = hot(module)(Container);
ReactDOM.render(<HotContainer />, document.getElementById("root"));
