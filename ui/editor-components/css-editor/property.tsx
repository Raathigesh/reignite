import React from "react";
import styled from "react-emotion";
import { Flex } from "reflexbox";
import ColorValue from "./color-value";

const Container = styled("div")``;
const Field = styled("div")`
  display: flex;
  padding-right: 5px;
  font-size: 12px;
`;
const TextField = styled("input")`
  border-width: 0;
  border-bottom: 1px solid #d9d9d9;
  width: 80px;
`;

interface Props {
  name: string;
  value: any;
  type: string;
  onChange: (propertyName: string, value: string) => void;
}

export default function Property({ name, value, type, onChange }: Props) {
  let valueComponent = (
    <TextField value={value} onChange={e => onChange(name, e.target.value)} />
  );

  switch (type) {
    case "color":
      valueComponent = (
        <ColorValue color={value} onChange={color => onChange(name, color)} />
      );
      break;
  }

  return (
    <Container>
      <Flex>
        <Field>{name}</Field>
        <Field>{valueComponent}</Field>
      </Flex>
    </Container>
  );
}
