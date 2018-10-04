import React from "react";
import { PreviewWindowURL } from "./constant";

interface Props {
  shouldShow: boolean;
}

export default function Preview({ shouldShow }: Props) {
  return (
    <div>
      {shouldShow && (
        <iframe
          id={"preview"}
          src={PreviewWindowURL}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      )}
    </div>
  );
}
