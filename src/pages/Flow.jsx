import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { partial, withPrompt } from '../utils/core'
import * as Api from '../api/flow'
import { Card, Title } from '../widgets/Card'

async function updateFlowName(id, callback, name) {
  await Api.updateFlowName(id, name)
  callback.call()
}

async function addCheckable(flowId, callback, text) {
  console.log('addCheckable')
  console.log('flowId', flowId)
  console.log('text', text)
  const result = await Api.createCheckable(flowId, text)
  console.log('result', result)
  callback.call(null)
}

function deleteCheckable(flowId, checkableId) {
  console.log('deleteCheckable')
}

function moveCheckable(flowId, checkableId, direction) {
  console.log('moveCheckable')
}

function BlockControls(events) {
  const Button = (props) => {
    return (
      <button
        type="button"
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-2 py-1 m-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        {...props}
      >
        {props.children}
      </button>
    )
  }

  return (
    <div>
      <Button onClick={withPrompt('Text', '', undefined, events.addCheckable)}>
        Add
      </Button>
      <Button>Del</Button>
      <Button>Up</Button>
      <Button>Down</Button>
    </div>
  )
}

function Block({ id, text }, events) {
  return (
    <div key={id} className="flex justify-between">
      <div className="flex items-center">{text}</div>
      <BlockControls {...events} />
    </div>
  )
}

function Flow({ flow, blocks, events }) {
  return (
    <div className="Flow mt-5 mx-2">
      <Card>
        {flow ? (
          <>
            <Title
              onDoubleClick={withPrompt(
                'Change name?',
                flow.name,
                undefined,
                events.updateFlowName,
                () => alert('Name can not be empty!')
              )}
            >
              {flow.name}
            </Title>

            <div className="blocks p-2">
              {blocks.map((el) => Block(el, events))}
            </div>
          </>
        ) : (
          <Title>Loading...</Title>
        )}
      </Card>
    </div>
  )
}

export default function Page() {
  let { id } = useParams()

  const initialMeta = {
    flow: { isLoading: false, isOutdated: true },
    blocks: { isLoading: false, isOutdated: true },
  }

  const initialBlocks = [{ id: 'empty-block', name: 'Empty' }]

  const [meta, setMeta] = useState(initialMeta)
  const [flow, setFlow] = useState(null)
  const [blocks, setBlocks] = useState(initialBlocks)

  const updateMeta = (previous, type, property, value) => {
    const current = { ...previous }
    current[type][property] = value
    return current
  }

  useEffect(() => {
    const loadFlow = async () => {
      setMeta((previous) => {
        return updateMeta(previous, 'flow', 'isLoading', true)
      })
      const result = await Api.readFlow(id)
      console.log('flows', result)
      setFlow(result)
      setMeta((previous) => {
        let current = updateMeta(previous, 'flow', 'isOutdated', false)
        return updateMeta(current, 'flow', 'isLoading', false)
      })
    }

    const loadBlocks = async () => {
      setMeta((previous) => {
        return updateMeta(previous, 'blocks', 'isLoading', true)
      })
      const result = await Api.queryCheckables(id)
      console.log('blocks', result)
      setBlocks(result)
      setMeta((previous) => {
        let current = updateMeta(previous, 'blocks', 'isOutdated', false)
        return updateMeta(current, 'blocks', 'isLoading', false)
      })
    }

    if (meta.flow.isOutdated && !meta.flow.isLoading) {
      loadFlow()
    }

    if (meta.blocks.isOutdated && !meta.blocks.isLoading) {
      loadBlocks()
    }
  }, [id, meta])

  const setIsOutdated = (type) => {
    setMeta((previous) => {
      return updateMeta(previous, type, 'isOutdated', true)
    })
  }

  const events = [
    [updateFlowName, 'flow'],
    [addCheckable, 'blocks'],
    [deleteCheckable, 'blocks'],
    [moveCheckable, 'blocks'],
  ].reduce(
    (acc, [fn, type]) => ({
      ...acc,
      [fn.name]: partial(fn, id, partial(setIsOutdated, type)),
    }),
    {}
  )

  return (
    <div className="FlowPage">
      {id !== 'not-found' ? (
        <Flow flow={flow} blocks={blocks} events={events}></Flow>
      ) : (
        <div>Flow not found</div>
      )}
    </div>
  )
}
