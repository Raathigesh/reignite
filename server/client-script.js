// This code is not trapiled
// Copied from https://github.com/loogle18/xray-react/blob/master/src/

function isEmpty(node) {
  return node == null;
}

function isSimple(node) {
  return (
    typeof node === "boolean" ||
    typeof node === "number" ||
    typeof node === "string"
  );
}

function getChildren(node) {
  if (node.child) {
    return getChildrenFromChild(node.child);
  } else if (node.memoizedProps) {
    return getChildrenFromProps(node.memoizedProps);
  } else if (node.props) {
    return getChildrenFromProps(node.props);
  }
  return [];
}

function getChildrenFromChild(node) {
  const children = [];
  while (node) {
    children.push(node);
    node = node.sibling;
  }
  return children;
}

function getChildrenFromProps(props) {
  return Array.isArray(props.children) ? props.children : [props.children];
}

function getDisplayName(node) {
  if (!node.type) {
    return null;
  }
  if (typeof node.type === "string") {
    return node.type;
  }
  return node.type.displayName || node.type.name || "[anonymous]";
}

function getDomNode(node) {
  const { stateNode } = node;
  return stateNode && stateNode.tagName ? stateNode : null;
}

function getInstance(node) {
  for (const key in node) {
    if (key.indexOf("__reactInternalInstance") === 0) {
      return node[key];
    }
  }
}

function getRoot(node) {
  return (
    node._reactRootContainer && node._reactRootContainer._internalRoot.current
  );
}

function findRoots(node) {
  const roots = [];
  const tree = document.createTreeWalker(node);

  while (tree.nextNode()) {
    const root = getRoot(tree.currentNode);
    if (root) {
      roots.push(root);
    }
  }
  return roots;
}

function walk(root, call) {
  // Skip empty nodes.
  if (isEmpty(root)) return;

  // Allow returning false to throw out the inclusive tree.
  if (call(root) === false) return;

  // Recursively walk children.
  getChildren(root).forEach(node => {
    // We add the parent node so we can look up in the tree if need be.
    if (!isEmpty(node) && typeof node === "object") {
      //node.parent = root;
    }
    walk(node, call);
  });
}

function insertCSS() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = `body {margin: 0} .reignite-highlight {
    border: 1px solid blue;
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
          /*   console.log({
            fiber,
            name: fiber.constructor.name,
            elem
          }); */
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
          //   console.log({ fiber, name: fiber.type.name, elem });
        }
      }
    }
  }

  return result;
}

function createElemForComponent(elem) {
  let xrayReactElem = document.createElement("div");
  let boundingClientRect = elem.getBoundingClientRect();
  xrayReactElem.className = "reignite-highlight";
  xrayReactElem.style.height = boundingClientRect.height + "px";
  xrayReactElem.style.width = boundingClientRect.width + "px";
  xrayReactElem.style.top = boundingClientRect.top + window.scrollY + "px";
  xrayReactElem.style.right = boundingClientRect.right + window.scrollX + "px";
  xrayReactElem.style.bottom =
    boundingClientRect.bottom - window.scrollY + "px";
  xrayReactElem.style.left = boundingClientRect.left - window.scrollX + "px";
  xrayReactElem.style.zIndex = 999999;
  return xrayReactElem;
}

function findCOmponents() {
  // ['ComponentA', 'ComponentB']
  const roots = findRoots(window.document.body);
  const tree = recurse(roots[0]);
  // console.log("tree", tree);
  parent.postMessage(
    {
      type: "reignite-tree",
      data: tree
    },
    "http://localhost:9000"
  );
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function getNodeType(fiberNode) {
  let type = null;

  if (fiberNode.type) {
    const nodeType = fiberNode.type;
    if (typeof nodeTypee === "string") {
      type = "primitive";
    } else if (nodeType.__emotion_base) {
      type = "emotion";
    } else {
      type = "component";
    }
  }

  return type;
}

function recurse(
  fiberNode,
  node = {
    name: "Root",
    childNodes: []
  }
) {
  console.log(fiberNode);
  const id = guid();
  const sibiliing = {
    label: getDisplayName(fiberNode),
    path: fiberNode.type && fiberNode.type.__reactstandin__key,
    id,
    childNodes: [],
    type: getNodeType(fiberNode)
  };

  if (fiberNode.stateNode.setAttribute) {
    fiberNode.stateNode.setAttribute("reignite-id", id);
  }

  node.childNodes.push(sibiliing);

  let sinode = fiberNode.sibling;
  while (sinode) {
    recurse(sinode, node);
    sinode = sinode.sibling;
  }

  if (fiberNode.child) {
    recurse(fiberNode.child, sibiliing);
  }

  return node;
}

window.addEventListener("message", function(event) {
  if (event.data.highlight) {
    removeAllWrappers();
    const elementToHighlight = document.querySelectorAll(
      '[reignite-id="' + event.data.highlight + '"]'
    )[0];
    if (elementToHighlight) {
      getAllReactNodes(elementToHighlight);
    }
  }
});

function getAllReactNodes(elem) {
  let xrayReactElementsWrapper = document.createElement("div");
  xrayReactElementsWrapper.className = "wrapper";
  xrayReactElementsWrapper.append(createElemForComponent(elem));

  window.document.body.append(xrayReactElementsWrapper);
}

function removeAllWrappers() {
  let wrappers = document.getElementsByClassName("wrapper");
  for (var i = 0; i < wrappers.length; ++i) {
    wrappers[i].remove();
  }
}

const handleXrayReactToggle = function() {
  insertCSS();
  findCOmponents();
  removeAllWrappers();
};
// ;

module.hot.addStatusHandler(status => {
  console.log(status);
  handleXrayReactToggle();
  // React to the current status...
});

window.onload = () => {
  handleXrayReactToggle();
};
