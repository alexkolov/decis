import { DataStore } from '@aws-amplify/datastore'
import { Flow } from '../models'

// TODO use everywhere
// import { SuccessResult, ErrorResult } from '../utils/api'

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
