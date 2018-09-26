// Copied from https://github.com/loogle18/xray-react/blob/master/src/

function insertCSS() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = `body {margin: 0} .reignite-highlight { background-color: rgba(0, 0, 255, 0.25);
    border: 2px solid blue;
    cursor: pointer;
    position: absolute;} .wrapper { bottom: 0;
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-style: normal;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;}
    .reignite-highlight::before {
        align-self: center;
        color: white;
        content: attr(data-xray-react-element-name);
        display: table;
        font-size: 18px;
        font-weight: 400;
        left: 50%;
        position: absolute;
        right: 0;
        text-align: center;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .reignite-highlight::after {
        background-color: darkblue;
        color: white;
        content: attr(data-xray-react-element-name);
        display: inline-block;
        font-size: 10px;
        left: 0;
        padding: 0 5px;
        position: absolute;
        top: 0;
      }
    `;
  document.body.appendChild(css);
}

function getReactNode(elem) {
  var result = null;
  for (const key of Object.keys(elem)) {
    if (key.startsWith("__reactInternalInstance$")) {
      let fiberNode = elem[key];
      if (fiberNode._currentElement) {
        let owner = fiberNode._currentElement._owner;
        let fiber = owner && owner._instance;
        if (fiber) {
          result = {
            fiber,
            name: fiber.constructor.name
          };
          console.log({
            fiber,
            name: fiber.constructor.name
          });
        }
      } else {
        let fiber =
          fiberNode.return &&
          fiberNode.return.stateNode &&
          fiberNode.return.stateNode._reactInternalFiber;
        if (fiber) {
          result = {
            fiber,
            name: fiber.type.name
          };
          // console.log({ fiber, name: fiber.type.name });
        }
      }
    }
  }

  return result;
}

function createElemForComponent(elem, componentName, fiber) {
  let xrayReactElem = document.createElement("div");
  let boundingClientRect = elem.getBoundingClientRect();
  xrayReactElem.setAttribute("data-xray-react-element-name", componentName);
  xrayReactElem.className = "reignite-highlight";
  xrayReactElem.style.height = boundingClientRect.height + "px";
  xrayReactElem.style.width = boundingClientRect.width + "px";
  xrayReactElem.style.top = boundingClientRect.top + window.scrollY + "px";
  xrayReactElem.style.right = boundingClientRect.right + window.scrollX + "px";
  xrayReactElem.style.bottom =
    boundingClientRect.bottom - window.scrollY + "px";
  xrayReactElem.style.left = boundingClientRect.left - window.scrollX + "px";
  xrayReactElem.style.zIndex = 999999;
  xrayReactElem.onclick = function() {
    console.log("SENDING...");
    parent.postMessage(
      {
        type: "reignite-preview",
        path: fiber.type.__reactstandin__key
      },
      "http://localhost:9000"
    );
  };
  return xrayReactElem;
}

function getAllReactNodes() {
  var highlighters = [];
  for (let elem of window.document.body.getElementsByTagName("*")) {
    var reactNode = getReactNode(elem);
    if (reactNode) {
      var highter = createElemForComponent(
        elem,
        reactNode.name,
        reactNode.fiber
      );
      highlighters.push(highter);
    }
  }

  let xrayReactElementsWrapper = document.createElement("div");
  xrayReactElementsWrapper.className = "wrapper";

  for (var x = 0; x < highlighters.length; x++) {
    var item = highlighters[x];
    xrayReactElementsWrapper.append(item);
  }

  window.document.body.append(xrayReactElementsWrapper);
}

fetch("http://localhost:4000/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: '{fileSelection(filePath: "hey")}' })
})
  .then(res => res.json())
  .then(res => console.log(res.data));

function removeAllWrappers() {
  let wrappers = document.getElementsByClassName("wrapper");
  for (var i = 0; i < wrappers.length; ++i) {
    wrappers[i].remove();
  }
}

const handleXrayReactToggle = function() {
  insertCSS();
  removeAllWrappers();
  let keyMap = { 17: false };
  document.body.addEventListener("keydown", function(event) {
    if (event.keyCode in keyMap) {
      removeAllWrappers();
      keyMap[event.keyCode] = true;
      if (keyMap[17]) {
        getAllReactNodes();
      }
    }
  });
  document.body.addEventListener("keyup", function(event) {
    if (event.keyCode in keyMap) {
      keyMap[event.keyCode] = false;
      removeAllWrappers();
    }
  });
};
handleXrayReactToggle();
