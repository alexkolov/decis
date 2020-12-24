import { useState, useEffect } from 'react'
import * as Api from '../api/block'

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

export default function Page() {
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
    <div className="BlockListPage">
      <h1>Blocks</h1>
      <button onClick={createBlock}>Create</button>
      <BlockList blocks={blocks}></BlockList>
    </div>
  )
}