import { Container } from "unstated";
import { onComponentTree } from "./post-message";

interface State {
  data: any;
}

export default class ConfigState extends Container<State> {
  state = {
    data: {}
  };

  constructor() {
    super();

    onComponentTree(treeData => {
      this.setState({
        data: treeData
      });
    });
  }
}
