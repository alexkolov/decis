import { Link } from 'react-router-dom'

export function FlowListEntry({ id, name }) {
  const path = `/flow/${id}`

  return (
    <div key={id}>
      <Link to={path}>{name}</Link>
    </div>
  )
}

export function FlowList({ flows }) {
  return <div className="p-2">{flows.map((el) => FlowListEntry(el))}</div>
}
