import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './widgets/Navigation'
import RouterOutlet from './widgets/RouterOutlet'
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
