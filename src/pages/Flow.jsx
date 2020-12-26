import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { withPrompt } from '../utils/core'
import * as Api from '../api/flow'
import { Card, Title } from '../widgets/Card'

/*
function Block({ id, type, name }, idx) {
  const inner =
    id !== 'empty' ? (
      <div className="Block">
        <div>#{idx + 1}</div>
        <div>{type}</div>
        <div>{name}</div>
      </div>
    ) : (
      'Empty'
    )
  return <div key={id}>{inner}</div>
}
*/

// const entries = blocks.length ? blocks : [{ id: 'empty' }]
// <div className="p-2">{entries.map((el, idx) => Block(el, idx))}</div>

function BlockControls(events) {
  console.log('events.addCheckable', events.addCheckable)
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
      <Button onClick={events.addCheckable}>Add</Button>
      <Button>Del</Button>
      <Button>Up</Button>
      <Button>Down</Button>
    </div>
  )
}

function Block({ id, name }, events) {
  return (
    <div key={id} className="flex justify-between">
      <div className="flex items-center">{name}</div>
      <BlockControls {...events}/>
    </div>
  )
}

const emptyBlocks = [{ id: 'empty-block', name: 'Empty' }]

function Flow({ name, blocks = emptyBlocks, events }) {
  return (
    <div className="Flow mt-5 mx-2">
      <Card>
        <Title
          onDoubleClick={withPrompt(
            'Change name?',
            name,
            undefined,
            events.updateFlowName,
            () => alert('Name can not be empty!')
          )}
        >
          {name}
        </Title>
        <div className="blocks p-2">
          {blocks.map((el) => Block(el, events))}
        </div>
      </Card>
    </div>
  )
}

async function updateFlowName(id, name) {
  console.log('updateFlowName', name)
  const result = await Api.updateFlowName(id, name)
  console.log(result)
}

function addCheckable(flowId, checkable) {
  console.log('addCheckable')
}

function deleteCheckable(flowId, checkableId) {
  console.log('deleteCheckable')
}

function moveCheckable(flowId, checkableId, direction) {
  console.log('moveCheckable')
}

export default function Page() {
  const [flow, setFlow] = useState(null)

  let { id } = useParams()

  useEffect(() => {
    const loadFlow = async () => {
      const result = await Api.readFlow(id)
      console.log('result', result)
      setFlow(result)
    }
    loadFlow()
  }, [id])

  const withId = (id, cb) => (...args) => cb.apply(null, [id, ...args])

  const events = [
    updateFlowName,
    addCheckable,
    deleteCheckable,
    moveCheckable,
  ].reduce(
    (acc, el) => ({
      ...acc,
      [el.name]: withId(id, el),
    }),
    {}
  )

  return (
    <div className="FlowPage">
      {id !== 'not-found' ? (
        <Flow {...flow} events={events}></Flow>
      ) : (
        <div>Flow not found</div>
      )}
    </div>
  )
}
