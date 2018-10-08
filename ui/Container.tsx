import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo-client";
import App from "./app";

import { tree as treeStore, tree } from "./store";
import "./style-override/style.css";

export default class Container extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider tree={treeStore}>
          <App />
        </Provider>
      </ApolloProvider>
    );
  }
}
