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

export async function loadNextFlows() {
  const recentFlow = [...(await DataStore.query(Flow))].sort((a, b) => {
    return b._lastChangedAt - a._lastChangedAt
  })[0]
  return { recentFlow }
}

// BLOCKS
export async function createCheckable(flowId, isChecked, text) {
  const flow = await readFlow(flowId)
  console.log('flow', flow)
  const checkable = new Checkable({ flowID: flow.id, text, isChecked })
  return DataStore.save(checkable)
}

export async function setCheckableIsChecked(id, value) {
  const oldState = await DataStore.query(Checkable, id)
  const newState = Flow.copyOf(oldState, (updated) => {
    updated.isChecked = value
  })
  return await DataStore.save(newState)
}

export async function queryCheckables(flowId) {
  return (await DataStore.query(Checkable)).filter((el) => el.flowID === flowId)
}
