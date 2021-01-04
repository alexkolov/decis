import { DataStore } from '@aws-amplify/datastore'
import { Checkable } from '../models'
import { readFlow } from './flow'
import { SuccessResult, ErrorResult } from '../utils/api'

export async function createCheckable(flowId, isChecked, text) {
  try {
    const flow = await readFlow(flowId)
    const checkable = new Checkable({ flowID: flow.id, text, isChecked })
    return SuccessResult(DataStore.save(checkable))
  } catch (error) {
    return ErrorResult(error)
  }
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
