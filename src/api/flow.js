import { DataStore } from '@aws-amplify/datastore'
import { Flow } from '../models'

export function createFlow({ name }) {
  const payload = new Flow({ name })
  return DataStore.save(payload)
}

export function readFlow(id) {
  return DataStore.query(Flow, id)
}


export async function updateFlowName(id, name) {
  console.log('id', id)
  console.log('name', name)
  const oldFlow = await DataStore.query(Flow, id);
  console.log('old', oldFlow)
  const newFlow = Flow.copyOf(oldFlow, updated => {
    updated.name = name;
  })

  return await DataStore.save(newFlow);
}

export function queryFlows() {
  return DataStore.query(Flow)
}
