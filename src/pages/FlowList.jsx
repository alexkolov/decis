import { useState, useEffect } from 'react'
import { withPrompt } from '../utils/core'
import * as Api from '../api/flow'
import { Card, Title } from '../widgets/ui/Card'
import { FlowList } from '../widgets/ui/FlowList'

function CreateFlowButton({ onClick }) {
  const createFlow = withPrompt(
    'Name of the Flow?',
    '',
    onClick,
    () => alert('Name can not be empty!')
  )

  return (
    <button
      onClick={createFlow}
      className="fixed bottom-3 right-3 flex items-center justify-center h-10 w-10 rounded-full bg-red-500 font-bold text-lg focus:outline-none"
    >
      +
    </button>
  )
}

function FlowListWidget({flows}) {
  return (
    <div className="FlowList mt-5 mx-2">
      <Card>
        <Title>Flows</Title>
        <FlowList flows={flows} />
      </Card>
    </div>
  )
}

export default function Page() {
  const [flows, setFlows] = useState([])
  const [isOutdated, setIsOutdated] = useState(true)

  useEffect(() => {
    const queryFlows = async () => {
      const result = await Api.queryFlows()
      console.log('flows:', result)
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
      <FlowListWidget flows={flows} />
      <CreateFlowButton onClick={createFlow} />
    </div>
  )
}
