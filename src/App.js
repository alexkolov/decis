import { useState, useEffect } from 'react'

import logo from './logo.svg'
import * as Api from './api/block'
import './App.css'

function createBlock() {
  console.log('create Block')
  Api.createBlock()
}

function BlockListEntry({ id, type, name }, idx) {
  const inner =
    id !== 'empty' ? (
      <div className="BlockListEntry">
        <div>#{idx + 1}</div>
        <div>{type}</div>
        <div>{name}</div>
      </div>
    ) : (
      'Empty'
    )
  return <div key={id}>{inner}</div>
}

function BlockList({ blocks }) {
  console.log('blocks', blocks)
  const entries = blocks.length ? blocks : [{ id: 'empty' }]
  return (
    <div className="BlockList">
      {entries.map((el, idx) => BlockListEntry(el, idx))}
    </div>
  )
}

function App() {
  // const blocks = await Api.queryBlocks()
  // console.log('blocks', blocks)

  const [blocks, setBlocks] = useState([])
  const [query, setQuery] = useState('all')

  useEffect(() => {
    const queryBlocks = async () => {
      const result = await Api.queryBlocks()
      setBlocks(result)
    }
    queryBlocks()
  }, [query])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={createBlock}>Create</button>
      </header>

      <BlockList blocks={blocks}></BlockList>
    </div>
  )
}

export default App
