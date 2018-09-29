import { PreviewWindowURL } from "../constant";

interface PostEvent {
  data: PostMessage;
}

interface PostMessage {
  type: string;
  data: any;
}

export function onComponentTree(handler: (data: any) => void) {
  window.addEventListener("message", (event: PostEvent) => {
    if (event.data.type === "reignite-tree") {
      handler(event.data.data);
    }
  });
}

function getPreviewWindow() {
  const previewWindow = document.getElementById("preview");
  if (!previewWindow) {
    return null;
  }
  return (previewWindow as any).contentWindow;
}

export function highlightComponent(id: string) {
  const window = getPreviewWindow();
  if (!window) {
    return;
  }

  window.postMessage(
    {
      highlight: id
    },
    PreviewWindowURL
  );
}
