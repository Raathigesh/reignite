import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import style from "./style";
import { highlightComponent } from "../../post-message";

interface State {
  cursor?: {
    active: boolean;
  };
}

interface Props {
  data: any;
}

export default class Tree extends Component<Props, State> {
  state = {
    cursor: {
      active: false
    }
  };

  onToggle = (node: any, toggled: boolean) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
    highlightComponent(node.id);
  };

  render() {
    return (
      <Treebeard
        data={this.props.data}
        style={style}
        onToggle={this.onToggle}
      />
    );
  }
}
