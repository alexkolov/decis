// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BlockType = {
  "RADIO": "RADIO",
  "DROPDOWN": "DROPDOWN",
  "TOGGLE": "TOGGLE",
  "CHECKABLE": "CHECKABLE"
};

const { Flow, FlowCheckable, Checkable, Block } = initSchema(schema);

export {
  Flow,
  FlowCheckable,
  Checkable,
  Block,
  BlockType
};