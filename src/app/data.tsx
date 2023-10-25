import { Node } from 'reactflow'

import { ChemNodeData, ReactNodeData } from '../types'

export const initialNodes: Node<ChemNodeData | ReactNodeData>[] = [
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

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
]

