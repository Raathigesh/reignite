import { observable } from "mobx";

export default class Declaration {
  @observable
  public name: string;
  @observable
  public value: string;
}
