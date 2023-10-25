import { useState } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Search from './Search'
import Chart from './Chart'
import { Node, useReactFlow } from 'reactflow'
import Reactions from './Reactions'

export default function Dashboard() {
  const [currentNode, setCurrentNode] = useState<Node>()

  const { addEdges, addNodes } = useReactFlow()

  const handleSelect = (node: Node) => {
    setCurrentNode(node)
  }

  const onImageClick = () => {
    let newNodes = [
      {
        id: '6',
        type: 'chemNode',
        data: { imgUrl: '/assets/sample1.svg', isLeaf: true },
        position: { x: 50, y: 100 },
      },
      {
        id: '8',
        type: 'reactionNode',
        data: { condition: '#2' },
        position: { x: 550, y: 100 },
      },
    ]

    let newEdges = [
      { id: 'e6-8', source: '6', target: '8', type: 'smoothstep' },
      { id: 'e8-1', source: '8', target: '1', type: 'smoothstep' },
    ]
    addNodes(newNodes)
    addEdges(newEdges)
  }

  return (
    <Flex direction='column' width='100%'>
      <Search />
      <Separator orientation='horizontal' size='4' />
      <Flex width='100%' className='h-80'>
        <Chart handleSelect={handleSelect} />
      </Flex>
      <Separator orientation='horizontal' size='4' />
      <Flex className='min-h-[300px]' width='100%' direction='row'>
        <Flex className='w-3/4' direction='column'>
          <Reactions />
        </Flex>
        <Flex
          className='w-1/4 ml-2'
          align='center'
          direction='column'
					gap='4'
          style={{ backgroundColor: 'var(--gray-a6)' }}
        >
          <Text align='center'>{currentNode? "当前目标" : "未选中目标"} </Text>
          <Flex align='center' justify='center' className='w-64 h-64 p-2'>
            {currentNode && currentNode.data.imgUrl && (
              <Image
                src={currentNode.data.imgUrl}
                alt='sample'
                width={270}
                height={270}
                className='bg-green-50 rounded-xl hover:cursor-pointer'
                onClick={onImageClick}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
