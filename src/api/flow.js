import { DataStore } from '@aws-amplify/datastore'
import { Flow, Checkable } from '../models'
import { SuccessResult, ErrorResult } from '../utils/api'

// FLOW
export function createFlow({ name }) {
  const payload = new Flow({ name })
  return DataStore.save(payload)
}

export function readFlow(id) {
  return DataStore.query(Flow, id)
}

export async function setFlowName(id, name) {
  const oldFlow = await DataStore.query(Flow, id)
  const newFlow = Flow.copyOf(oldFlow, (updated) => {
    updated.name = name
  })

  try {
    const result = await DataStore.save(newFlow)
    return { status: 'success', payload: result }
  } catch (error) {
    return { status: 'error', payload: error }
  }
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
// TODO: -> own namespace, Checkables
export async function createCheckable(flowId, isChecked, text) {
  const flow = await readFlow(flowId)
  console.log('flow', flow)
  const checkable = new Checkable({ flowID: flow.id, text, isChecked })
  return DataStore.save(checkable)
}

export function readCheckable(id) {
  return DataStore.query(Checkable, id)
}

export async function deleteCheckable(id) {
  try {
    const item = await DataStore.query(Checkable, id);
    const result = DataStore.delete(item);
    return SuccessResult(result)
  } catch (error) {
    return ErrorResult(error)
  }
}

export async function setCheckableIsChecked(id, value) {
  const oldState = await DataStore.query(Checkable, id)
  const newState = Checkable.copyOf(oldState, (updated) => {
    updated.isChecked = value
  })

  try {
    const result = await DataStore.save(newState)
    return { status: 'success', payload: result }
  } catch (error) {
    return { status: 'error', payload: error }
  }
}

export async function setCheckableText(id, text) {
  const oldState = await DataStore.query(Checkable, id)
  const newState = Checkable.copyOf(oldState, (updated) => {
    updated.text = text
  })

  try {
    const result = await DataStore.save(newState)
    return { status: 'success', payload: result }
  } catch (error) {
    return { status: 'error', payload: error }
  }
}


export async function queryCheckables(flowId) {
  return (await DataStore.query(Checkable)).filter((el) => el.flowID === flowId)
}
