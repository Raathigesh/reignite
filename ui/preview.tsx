import React from "react";
import { PreviewWindowURL } from "./constant";

export default function Preview() {
  return (
    <iframe
      id={"preview"}
      src={PreviewWindowURL}
      width="100%"
      height="100%"
      frameBorder="0"
    />
  );
}
