import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { partial, withPrompt } from '../utils/core'
import * as Api from '../api/flow'
import { Card, Title } from '../widgets/Card'

async function updateFlowName(id, callback, name) {
  await Api.updateFlowName(id, name)
  callback.call()
}

async function addCheckable(flowId, stateUpdateFn, text) {
  console.log('addCheckable')
  console.log('flowId', flowId)
  console.log('text', text)
  const result = await Api.createCheckable(flowId, false, text)
  console.log('result', result)
  stateUpdateFn.call(null)
}

function deleteCheckable(flowId, checkableId) {
  console.log('deleteCheckable')
}

function moveCheckable(flowId, checkableId, direction) {
  console.log('moveCheckable')
}

async function blockEventContainer(flowId, stateUpdateFn, eventFn) {
  console.log('blockEventContainer', flowId)
  console.log('eventFn', eventFn)
  const result = (await eventFn).call(null)
  console.log('eventFn result', result)
  // stateUpdateFn.call(null)
}

function Checkable({ block, events }) {
  console.log('Checkable block', block)

  const update = async (id, value) => {
    return () => {
      console.log('update:', id, value)
      return 'working'
    }
  }

  const Checkbox = ({ id, isChecked, eventContainer }) => (
    <input
      checked={isChecked}
      onChange={() => eventContainer(update(id, isChecked))}
      type="checkbox"
    />
  )

  return (
    <div className="flex items-center justify-between">
      {block.id !== 'empty-block' ? (
        <Checkbox
          id={block.id}
          isChecked={block.isChecked}
          eventContainer={events.blockEventContainer}
        />
      ) : null}

      {block.text}
    </div>
  )
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

  const onAddClick = withPrompt(
    'Text',
    '',
    undefined,
    events.addCheckable,
    () => alert('Text can not be empty!')
  )

  return (
    <div>
      <Button onClick={onAddClick}>Add</Button>
      <Button>Del</Button>
      <Button>Up</Button>
      <Button>Down</Button>
    </div>
  )
}

function Block(block, events) {
  return (
    <div key={block.id} className="flex justify-between">
      <Checkable block={block} events={events} />
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

  const initialBlocks = useMemo(
    () => [{ id: 'empty-block', isChecked: false, text: 'Empty Flow' }],
    []
  )

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
      const blocks = result.length ? result : initialBlocks
      console.log('blocks', blocks)
      setBlocks(blocks)
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
  }, [id, meta, initialBlocks])

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
    [blockEventContainer, 'blocks'],
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
