export function Card({ children }) {
  return <div className="bg-gray-100 shadow-lg rounded-lg">{children}</div>
}

export function Title(props) {
  return (
    <h2 className="p-2 bg-gray-300 font-bold rounded-sm cursor-pointer select-none" {...props }>
      {props.children}
    </h2>
  )
}
