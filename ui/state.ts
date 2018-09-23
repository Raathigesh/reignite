import { Provider, Subscribe, Container } from "unstated";
const prettier = require("prettier/standalone");
const parser = require("prettier/parser-babylon");
import { produce } from "immer";

interface State {
  activeFile: string;
}

export default class ConfigState extends Container<State> {
  state = {
    activeFile: ""
  };
}
