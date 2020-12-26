import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum BlockType {
  RADIO = "RADIO",
  DROPDOWN = "DROPDOWN",
  TOGGLE = "TOGGLE",
  CHECKABLE = "CHECKABLE"
}



export declare class Flow {
  readonly id: string;
  readonly name?: string;
  readonly FlowCheckables?: (FlowCheckable | null)[];
  constructor(init: ModelInit<Flow>);
  static copyOf(source: Flow, mutator: (draft: MutableModel<Flow>) => MutableModel<Flow> | void): Flow;
}

export declare class FlowCheckable {
  readonly id: string;
  readonly flow: Flow;
  readonly checkable: Checkable;
  constructor(init: ModelInit<FlowCheckable>);
  static copyOf(source: FlowCheckable, mutator: (draft: MutableModel<FlowCheckable>) => MutableModel<FlowCheckable> | void): FlowCheckable;
}

export declare class Checkable {
  readonly id: string;
  readonly text?: string;
  readonly flows?: (FlowCheckable | null)[];
  constructor(init: ModelInit<Checkable>);
  static copyOf(source: Checkable, mutator: (draft: MutableModel<Checkable>) => MutableModel<Checkable> | void): Checkable;
}

export declare class Block {
  readonly id: string;
  readonly type: BlockType | keyof typeof BlockType;
  readonly name: string;
  constructor(init: ModelInit<Block>);
  static copyOf(source: Block, mutator: (draft: MutableModel<Block>) => MutableModel<Block> | void): Block;
}