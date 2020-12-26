import { DataStore } from '@aws-amplify/datastore'
import { Flow, Checkable } from '../models'

// FLOW
export function createFlow({ name }) {
  const payload = new Flow({ name })
  return DataStore.save(payload)
}

export function readFlow(id) {
  return DataStore.query(Flow, id)
}

export async function updateFlowName(id, name) {
  const oldFlow = await DataStore.query(Flow, id)
  const newFlow = Flow.copyOf(oldFlow, (updated) => {
    updated.name = name
  })

  return await DataStore.save(newFlow)
}

export function queryFlows() {
  return DataStore.query(Flow)
}

// BLOCKS
export async function createCheckable(flowId, text) {
  const flow = await readFlow(flowId)
  console.log('flow', flow)
  const checkable = new Checkable({ flowID: flow.id, text })
  return DataStore.save(checkable)
}

export async function queryCheckables(flowId) {
  return (await DataStore.query(Checkable)).filter(
    (el) => el.flowID === flowId
  )
}
