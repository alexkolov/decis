import { DataStore } from '@aws-amplify/datastore'
import { Block, BlockType } from '../models'

export async function createBlock() {
  await DataStore.save(
    new Block({
      type: BlockType.RADIO,
      name: 'Lorem ipsum dolor sit amet',
    })
  )
}

export async function updateBlock() {
  /* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly
  await DataStore.save(
    Block.copyOf(CURRENT_ITEM, (item) => {
      // Update the values on {item} variable to update DataStore entry
    })
  ); */
}

export async function deleteBlock() {
  const modelToDelete = await DataStore.query(Block, 123456789)
  DataStore.delete(modelToDelete)
}

export async function queryBlocks() {
  return await DataStore.query(Block)
}
