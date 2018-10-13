import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import { hot } from "react-hot-loader";
import "@babel/polyfill";
import Container from "./Container";
import installGlobalHook from "../react-devtools/backend/installGlobalHook";
import setupBackend from "../react-devtools/backend/backend";
import getData from "../react-devtools/backend/getData";

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

.bp3-tree-node-caret {
    padding-top: 10px;
}

.bp3-tree-node-list {
    margin-left: -12px !important;
}
`;

const HotContainer = hot(module)(Container);
ReactDOM.render(<HotContainer />, document.getElementById("root"));

installGlobalHook(window);
const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
setupBackend(hook);
hook.sub("renderer-attached", ({ id, renderer, helpers }) => {
  // helpers.walkTree();
});

hook.sub("mount", ({ renderer, internalInstance, data }) => {
  console.log(data.id);
});

hook.sub("root", ({ renderer, internalInstance }) => {});
