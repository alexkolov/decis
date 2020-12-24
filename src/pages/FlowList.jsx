import { Link } from 'react-router-dom'

export default function Page() {
  return (
    <div className="FlowListPage">
      <h1>Flow</h1>

      <Link to="/flow/new/block-list">Add</Link>
    </div>
  )
}