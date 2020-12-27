import { Switch, Route } from 'react-router-dom'
import FlowListPage from '../../pages/FlowList'
import FlowPage from '../../pages/Flow'
import HomePage from '../../pages/Home'

export default function RouterOutlet() {
  return (
    <Switch>
      <Route path="/flow-list">
        <FlowListPage />
      </Route>

      <Route 
        path="/flow/:id"
        children={<FlowPage />}
      > 
      </Route>

      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  )
}
