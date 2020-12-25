import {Card, Title} from './Card'

export default function Widget({ className }) {
  return (
    <div className={'StatsWidget ' + className}>
      <Card>
        <Title>Statistics</Title>
        <div className="p-2">Content</div>
      </Card>
    </div>
  )
}