import { NavLink } from 'react-router-dom'

function Link(props) {
  return (
    <NavLink
      activeStyle={{
        color: 'red',
      }}
      className="font-bold"
      {...props}
    >
      {props.children}
    </NavLink>
  )
}

export default function Navigation() {
  return (
    <nav className="p-3 bg-gray-300">
      <ul className="flex flex-row">
        <li className="pr-5">
          <Link to="/" exact>
            Home
          </Link>
        </li>

        <li className="pr-5">
          <Link to="/flow-list">
            Flow
          </Link>
        </li>
      </ul>
    </nav>
  )
}
