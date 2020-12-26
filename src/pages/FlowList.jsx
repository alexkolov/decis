import { useState, useEffect } from 'react'
import * as Api from '../api/flow'
import { Link } from 'react-router-dom'
import { Card, Title } from '../widgets/Card'

function Flow({ id, name }) {
  const path = `/flow/${id}`

  return (
    <div key={id}>
      <Link to={path}>{name}</Link>
    </div>
  )
}

function List({ flows }) {
  return (
    <div className="FlowList mt-5 mx-2">
      <Card>
        <Title>Flows</Title>
        <div className="p-2">{flows.map((el) => Flow(el))}</div>
      </Card>
    </div>
  )
}

function CreateFlowButton({ onClick }) {
  const withPrompt = (cb) => {
    return () => {
      const input = prompt('Name of the Flow?', '');
      const isCanceled = input === null
      if (isCanceled) {
        return
      }
      if (input) {
        cb.call(null, input)
      } else {
        alert('Name can not be empty!')
      }
    }
  }

  return (
    <button
      onClick={withPrompt(onClick)}
      className="fixed bottom-3 right-3 flex items-center justify-center h-10 w-10 rounded-full bg-red-500 font-bold text-lg focus:outline-none"
    >
      +
    </button>
  )
}

export default function Page() {
  const [flows, setFlows] = useState([])
  const [isOutdated, setIsOutdated] = useState(true)

  useEffect(() => {
    const queryFlows = async () => {
      const result = await Api.queryFlows()
      console.log('api load result:', result)
      setFlows(result)
      setIsOutdated(false)
    }
    if (isOutdated) {
      queryFlows()
    }
  }, [isOutdated])

  const createFlow = async (name) => {
    console.log('createFlow api:', name)
    const result = await Api.createFlow({ name })
    console.log('createFlow result', result)
    setIsOutdated(true)
  }

  return (
    <div className="FlowListPage">
      <List flows={flows} />
      <CreateFlowButton onClick={createFlow} />
    </div>
  )
}
