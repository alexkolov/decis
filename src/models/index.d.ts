import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum BlockType {
  RADIO = "RADIO",
  DROPDOWN = "DROPDOWN",
  TOGGLE = "TOGGLE"
}



export declare class Block {
  readonly id: string;
  readonly type: BlockType | keyof typeof BlockType;
  readonly name: string;
  constructor(init: ModelInit<Block>);
  static copyOf(source: Block, mutator: (draft: MutableModel<Block>) => MutableModel<Block> | void): Block;
}