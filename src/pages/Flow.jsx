import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { partial, asNoopFn, withConfirm, withPrompt } from '../utils/core'
import * as FlowApi from '../api/flow'
import * as CheckableApi from '../api/checkable'
import { Card, Title } from '../widgets/ui/Card'
import { PencilSmall } from '../widgets/icons/Pencil'
import './Flow.css'

async function eventContainer(context, callback) {
  await callback.call(null, context)
}

function Checkable({ block, eventContainer }) {
  const updateIsChecked = (value) => {
    const fn = async (context) => {
      const result = await CheckableApi.setCheckableIsChecked(block.id, value)
      context.stateUpdate('blocks', result)
    }
    return () => eventContainer(fn)
  }

  const onSetTextSuccess = (input) => {
    const fn = async (context) => {
      const result = await CheckableApi.setCheckableText(block.id, input)
      context.stateUpdate('blocks', result)
    }
    return eventContainer(fn)
  }

  const setText = withPrompt(
    'Text',
    block.text,
    onSetTextSuccess,
    undefined,
    () => alert('Text can not be empty!')
  )
  
  const Checkbox = ({ isChecked }) => (
    <input
      checked={isChecked}
      onChange={updateIsChecked(!isChecked)}
      className="mr-2"
      type="checkbox"
    />
  )

  return (
    <div className="Checkable flex items-center justify-between">
      {block.id !== 'empty-block' ? (
        <Checkbox
          id={block.id}
          isChecked={block.isChecked}
        />
      ) : null}

      <div className="flex items-center">
        <div className={'Text mr-1 ' + (block.isChecked ? 'checked' : '')}>
          {block.text}
        </div>
        <PencilSmall
          onClick={setText}
          className="h-4 w-4 cursor-pointer"
        />
      </div>
    </div>
  )
}

// TODO refactor eventContainer
function BlockControls({ block, eventContainer }) {
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

  const onAddClick = ({ flowId }) =>
    withPrompt(
      'Text',
      '',
      partial(CheckableApi.createCheckable, flowId, false),
      undefined,
      asNoopFn(alert, 'Text can not be empty!') // TODO reomove?
    ).call()

  const onDeleteClick = withConfirm('Really delete?', () =>
    CheckableApi.deleteCheckable(block.id)
  )

  return (
    <div>
      <Button onClick={() => eventContainer('blocks', onAddClick)}>Add</Button>
      <Button onClick={() => eventContainer('blocks', onDeleteClick)}>
        Del
      </Button>
      <Button>Up</Button>
      <Button>Down</Button>
    </div>
  )
}

function Block(block, eventContainer) {
  return (
    <div key={block.id} className="flex justify-between">
      <Checkable block={block} eventContainer={eventContainer} />
      <BlockControls block={block} eventContainer={eventContainer} />
    </div>
  )
}

function Flow({ flow, blocks, eventContainer }) {
  const Counter = () => {
    if (blocks[0].id === 'empty-block') {
      return null
    }
    const allBlocks = blocks.length
    const checkedBlocks = blocks.filter((el) => el.isChecked).length
    return (
      <div className="ml-1 font-normal">
        [{checkedBlocks + '/' + allBlocks}]
      </div>
    )
  }

  const onInputFn = (input) => {
    const fn = async (context) => {
      const result = await FlowApi.setFlowName(context.flowId, input)
      context.stateUpdate('flow', result)
    }
    return eventContainer(fn)
  }

  return (
    <div className="Flow mt-5 mx-2">
      <Card>
        {flow ? (
          <>
            <Title
              onClick={withPrompt(
                'Change name?',
                flow.name,
                onInputFn,
                undefined,
                asNoopFn(alert, 'Name can not be empty!')
              )}
            >
              {flow.name}
              <Counter />
            </Title>

            <div className="blocks p-2">
              {blocks.map((el) => Block(el, eventContainer))}
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
  // CORE
  let { id } = useParams()

  // STATES
  const initialMeta = {
    flow: { isLoading: false, isOutdated: true },
    blocks: { isLoading: false, isOutdated: true },
  }

  // TODO resetBlocks(setBlocks(initialBlocks))
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

  // EFFECTS
  useEffect(() => {
    const loadFlow = async () => {
      setMeta((previous) => {
        return updateMeta(previous, 'flow', 'isLoading', true)
      })
      const result = await FlowApi.readFlow(id)
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
      const result = await CheckableApi.queryCheckables(id)
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

  // EVENTS
  const setIsOutdated = (type, result) => {
    console.log('result.status', result.status)
    if (result.status === 'noop') {
      return
    }
    setMeta((previous) => {
      return updateMeta(previous, type, 'isOutdated', true)
    })
  }

  const eventContainerFn = partial(eventContainer, {
    flowId: id,
    stateUpdate: setIsOutdated,
  })

  return (
    <div className="FlowPage">
      {id !== 'not-found' ? (
        <Flow
          flow={flow}
          blocks={blocks}
          eventContainer={eventContainerFn}
        ></Flow>
      ) : (
        <div>Flow not found</div>
      )}
    </div>
  )
}
