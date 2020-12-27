import { useEffect, useMemo, useState } from 'react'
import * as Api from '../api/flow'
import NextWidget from '../widgets/pages/Next'
import StatsWidget from '../widgets/pages/Stats'

export default function Page() {
  const initialNextFlows = useMemo(
    () => [{ recentFlow: {} }],
    []
  )

  const [nextFlows, setNextFlows] = useState()

  useEffect(() => {
    const loadNextFlows = async () => {
      const result = await Api.loadNextFlows()
      console.log('next flows:', result)
      setNextFlows(result)
    }
    loadNextFlows()
  }, [initialNextFlows])

  return (
    <div className="HomePage">
      <NextWidget flows={nextFlows} className="mt-5 mx-2" />
      <StatsWidget className="mt-5 mx-2" />
    </div>
  )
}
