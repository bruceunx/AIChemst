'use client'

import { Flex } from '@radix-ui/themes'
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ChemNode from './ChemNode'

import { ChemNodeData } from '../../types'

const nodeTypes = {
  chemNode: ChemNode,
}

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'lightgreen' },
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'lightgreen',
  },
}

const initialNodes: Node<ChemNodeData>[] = [
  {
    id: '1',
    type: 'chemNode',
    data: { imgUrl: '/assets/sample1.svg', isLeaf: true },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'chemNode',
    data: { imgUrl: '/assets/sample.svg', isTarget: true },
    position: { x: 100, y: 200 },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
]

export default function Chart() {
  const [nodes, ___, onNodesChange] = useNodesState(initialNodes)
  const [edges, _, __] = useEdgesState(initialEdges)

  return (
    <Flex className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
				defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </Flex>
  )
}
