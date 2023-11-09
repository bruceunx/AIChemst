import { useState } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import Search from './Search'
import Chart from './Chart'
import { Node } from 'reactflow'
import Reactions from './Reactions'
import NodeDetail from './NodeDetail'
import RouteDetail from './RouteDetail'

export default function Dashboard() {
  const [currentNode, setCurrentNode] = useState<Node | null>(null)

  const [routes, setRoutes] = useState([])

  const handleSelect = (node: Node) => {
    setCurrentNode(node)
    setRoutes([])
  }

  return (
    <Flex direction='column' width='100%'>
      <Search setRoutes={setRoutes} setCurrentNode={setCurrentNode} />
      <Separator orientation='horizontal' size='4' />
      <Flex width='100%' className='h-80'>
        <Chart handleSelect={handleSelect} />
      </Flex>
      <Separator orientation='horizontal' size='4' />
      <Flex className='min-h-[300px]' width='100%' direction='row'>
        <Flex className='w-3/4' direction='column'>
          <Reactions routes={routes} currentNode={currentNode} />
        </Flex>
        <Flex
          className='w-1/4 ml-2 h-fit'
          align='center'
          direction='column'
          gap='4'
          style={{ backgroundColor: 'var(--gray-a6)' }}
        >
          <Text align='center'>{currentNode ? '当前目标' : '未选中目标'} </Text>
          <Flex
            align='center'
            justify='center'
            className='w-64 p-2 mt-4 h-fit'
            direction='column'
            gap='4'
          >
            {currentNode && currentNode.type === 'chemNode' && (
              <NodeDetail setRoutes={setRoutes} currentNode={currentNode} />
            )}
            {currentNode && currentNode.type === 'reactionNode' && (
              <RouteDetail currentNode={currentNode} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
