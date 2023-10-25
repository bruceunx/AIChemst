import { useState } from 'react'
import { Flex, Separator } from '@radix-ui/themes'
import Image from 'next/image'
import Search from './Search'
import Chart from './Chart'
import {  Node, useReactFlow} from 'reactflow'

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
        <Flex className='w-3/4'>
          <p>reaction tables</p>
        </Flex>
        <Flex className='w-1/4 ml-2'>
          <p>current reagent</p>
          <Flex className='w-32 h-32 relative m-4'>
            {currentNode && (
              <Image
                src={currentNode.data.imgUrl}
                alt='sample'
                fill
                className='bg-green-50'
                onClick={onImageClick}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
