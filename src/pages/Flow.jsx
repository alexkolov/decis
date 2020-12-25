import { useState, useEffect } from 'react'
import * as Api from '../api/block'
import { Card, Title } from '../widgets/Card'

function createBlock() {
  console.log('create Block')
  Api.createBlock()
}

function Block({ id, type, name }, idx) {
  const inner =
    id !== 'empty' ? (
      <div className="Block">
        <div>#{idx + 1}</div>
        <div>{type}</div>
        <div>{name}</div>
      </div>
    ) : (
      'Empty'
    )
  return <div key={id}>{inner}</div>
}

function Flow({ blocks }) {
  console.log('blocks', blocks)
  const entries = blocks.length ? blocks : [{ id: 'empty' }]
  return (
    <div className="Flow mx-2">
      <Card>
        <Title>Name of the Flow</Title>
        <div className="p-2">
          {entries.map((el, idx) => Block(el, idx))}
        </div>
      </Card>
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
    <div className="FlowPage">
      <button onClick={createBlock}>Create</button>
      <Flow blocks={blocks}></Flow>
    </div>
  )
}