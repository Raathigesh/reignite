import { Provider, Subscribe, Container } from "unstated";
const prettier = require("prettier/standalone");
const parser = require("prettier/parser-babylon");
import { produce } from "immer";

interface State {
  data: any;
}

export default class ConfigState extends Container<State> {
  state = {
    data: {}
  };

  constructor() {
    super();

    window.addEventListener("message", (event: any) => {
      if (event.data.type === "reignite-tree") {
        this.setState({
          data: event.data.data
        });
      }
    });
  }
}
