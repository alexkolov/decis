import { Switch, Route } from 'react-router-dom'
import FlowListPage from '../pages/FlowList'
import BlockListPage from '../pages/BlockList'
import HomePage from '../pages/Home'

export default function RouterOutlet() {
  return (
    <Switch>
      <Route path="/flow-list">
        <FlowListPage />
      </Route>

      <Route path="/flow/new/block-list">
        <BlockListPage />
      </Route>

      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  )
}
