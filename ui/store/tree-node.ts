import { observable, IObservableArray } from "mobx";

type NodeType = "emotion" | "primitive" | "component";

export default class TreeNode {
  @observable
  public id: string;
  @observable
  public type: NodeType;
  @observable
  public label: string;
  @observable
  public path: string;
  @observable
  public hasCaret: boolean;
  @observable
  public children: IObservableArray<TreeNode> = observable([]);

  constructor({
    id,
    type,
    label,
    path,
    hasCaret,
    childNodes
  }: {
    id: string;
    type: NodeType;
    label: string;
    path: string;
    hasCaret: boolean;
    childNodes: TreeNode[];
  }) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.path = path;
    this.hasCaret = hasCaret;
    this.children.push(...childNodes);
  }
}
