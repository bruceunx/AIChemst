'use client'

import { Flex } from '@radix-ui/themes'
import ReactFlow, { Background, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
]

export default function Chart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <Flex className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </Flex>
  )
}
