import React, { Component } from "react";
import styled from "react-emotion";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  color: white;
  padding-left: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  cursor: pointer;
`;

const Label = styled("span")``;

interface Node {
  id: string;
  label: string;
  children: Node[];
}

interface Props {
  root: Node;
  highlightComponent: (id: string) => void;
}

export default class TreeNode extends Component<Props> {
  render() {
    const { label, children, id } = this.props.root;
    return (
      <Container>
        <Label
          onMouseOver={() => {
            this.props.highlightComponent(id);
          }}
        >
          {label}
        </Label>
        {children.map(child => (
          <TreeNode
            root={child}
            highlightComponent={this.props.highlightComponent}
          />
        ))}
      </Container>
    );
  }
}
