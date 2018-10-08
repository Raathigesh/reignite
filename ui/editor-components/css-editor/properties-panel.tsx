import React from "react";
import styled from "react-emotion";
import Property from "./property";

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
    </Container>
  );
}
