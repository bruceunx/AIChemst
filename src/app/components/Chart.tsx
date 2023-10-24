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

import { ChemNodeData, ReactNodeData } from '../../types'
import ReactionNode from './ReactionNode'
import ChemNode from './ChemNode'

const nodeTypes = {
  chemNode: ChemNode,
  reactionNode: ReactionNode,
}

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'lightgreen' },
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'lightgreen',
  },
}

const initialNodes: Node<ChemNodeData | ReactNodeData>[] = [
  {
    id: '1',
    type: 'chemNode',
    data: { imgUrl: '/assets/sample1.svg', isLeaf: true },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'reactionNode',
    data: { condition: '#1' },
    position: { x: 300, y: 100 },
  },
  {
    id: '3',
    type: 'chemNode',
    data: { imgUrl: '/assets/sample.svg', isTarget: true },
    position: { x: 500, y: 100 },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
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
