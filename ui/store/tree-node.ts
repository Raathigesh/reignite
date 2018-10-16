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
  public source: any;
  @observable
  public children: IObservableArray<TreeNode> = observable([]);

  constructor({
    id,
    type,
    label,
    path,
    hasCaret,
    childNodes,
    source
  }: {
    id: string;
    type: NodeType;
    label: string;
    path: string;
    hasCaret: boolean;
    source: any;
    childNodes: TreeNode[];
  }) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.path = path;
    this.hasCaret = hasCaret;
    this.source = source;
    this.children.push(...childNodes);
  }
}
