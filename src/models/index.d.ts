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
  readonly Checkables?: (Checkable | null)[];
  constructor(init: ModelInit<Flow>);
  static copyOf(source: Flow, mutator: (draft: MutableModel<Flow>) => MutableModel<Flow> | void): Flow;
}

export declare class Checkable {
  readonly id: string;
  readonly text?: string;
  readonly flowID: string;
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