import { Card, Title } from './Card'

export default function Widget({ className }) {
  return (
    <div className={'NextWidget ' + className}>
      <Card>
        <Title>Next</Title>
        <div className="p-2">Content</div>
      </Card>
    </div>
  )
}
