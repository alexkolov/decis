// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BlockType = {
  "RADIO": "RADIO",
  "DROPDOWN": "DROPDOWN",
  "TOGGLE": "TOGGLE"
};

const { Block } = initSchema(schema);

export {
  Block,
  BlockType
};