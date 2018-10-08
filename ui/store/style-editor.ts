import client from "../apollo-client";

import { observable, IObservableArray } from "mobx";
import StyledComponent from "./styled-component";

export default class StyleEditor {
  @observable
  public path: string;
  @observable
  public styledComponents: IObservableArray<StyledComponent> = observable([]);

  async fetchDeclarations(path: string) {
    const styledComponents = await client.query({
      query: GET_CSS_PROPERTIES,
      variables: {
        filePath: path
      }
    });
  }
}
