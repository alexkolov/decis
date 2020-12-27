import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './widgets/core/Navigation'
import RouterOutlet from './widgets/core/RouterOutlet'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <RouterOutlet />
      </Router>
    </div>
  )
}
