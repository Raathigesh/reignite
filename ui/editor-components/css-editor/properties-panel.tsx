import React from "react";
import styled from "react-emotion";
import Property from "./property";
import Border from "./border";
import BorderRadius from "./border-radius";
import Margin from "./margin";

const Container = styled("div")``;

interface Props {
  properties: {
    name: string;
    value: any;
    type: string;
  }[];
  onChange: (propertyName: string, value: string) => void;
}

export default function PropertiesPanel({ properties, onChange }: Props) {
  return (
    <Container>
      {properties.map(property => (
        <Property
          name={property.name}
          value={property.value}
          type={property.type}
          onChange={onChange}
        />
      ))}
      <Border />
      <BorderRadius />
      <Margin />
    </Container>
  );
}
