export function Card({ children }) {
  return <div className="bg-gray-100 shadow-lg rounded-lg">{children}</div>
}

export function Title({ children }) {
  return <h2 className="p-2 bg-gray-400 font-bold rounded-sm">{children}</h2>
}

