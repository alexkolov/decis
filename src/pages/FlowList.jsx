import { Link } from 'react-router-dom'
import { Card, Title } from '../widgets/Card'

function List() {
  return (
    <div className="FlowList mt-5 mx-2">
      <Card>
        <Title>Flows</Title>
        <div className="p-2">Content</div>
      </Card>
    </div>
  )
}

function AddButton() {
  return (
    <Link
      to="/flow/new"
      className="fixed bottom-3 right-3 flex items-center justify-center h-10 w-10 rounded-full bg-red-500 font-bold text-lg"
    >
      +
    </Link>
  )
}

export default function Page() {
  return (
    <div className="FlowListPage">
      <List></List>
      <AddButton />
    </div>
  )
}
