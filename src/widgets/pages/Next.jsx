import { Card, Title } from '../ui/Card'
import { FlowList } from '../ui/FlowList'

export default function Widget({ className, flows }) {
  console.log('next widget flows', flows)
  let _flows = []
  if (flows) {
    _flows.push(flows.recentFlow)
  }
  
  return (
    <div className={'NextWidget ' + className}>
      <Card>
        {flows ? (
          <>
            <Title>Next</Title>
            <FlowList flows={_flows} />
          </>
        ) : (
          <Title>Loading...</Title>
        )}
      </Card>
    </div>
  )
}
