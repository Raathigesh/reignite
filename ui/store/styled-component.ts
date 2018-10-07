import { observable, IObservableArray } from "mobx";
import { Declaration } from "@babel/types";

export default class StyledComponent {
  @observable
  public name: string;
  @observable
  public declarations: IObservableArray<Declaration> = observable([]);
}
