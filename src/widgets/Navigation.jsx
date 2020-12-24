import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/flow-list">Flow</Link>
        </li>
      </ul>
    </nav>
  )
}
