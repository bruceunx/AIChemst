import Image from 'next/image'
import { Button, Text } from '@radix-ui/themes'

import { NodeProps } from '@/types'
import { useState } from 'react'
import { findRoutes } from '../utils/api'
import { useReactFlow } from 'reactflow'

const NodeDetail: React.FC<NodeProps> = ({ currentNode, setRoutes }) => {
  const [text, setText] = useState<string>('开始AI设计')
  const [error, setError] = useState<boolean>(false)

  const { setNodes } = useReactFlow()

  const onClick = async () => {
    setText('正在设计中...')
		setError(false)

    const routes = await findRoutes(currentNode.data.smiles)
    if (routes === null) {
      setError(true)
    } else {
      setRoutes(routes)

      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === currentNode.id) {
            node.data = { ...node.data, isLeaf: false }
          }
          return node
        }),
      )
    }
		
    setText('开始AI设计')
  }

  return (
    <>
      <Image
        src={currentNode.data.imgUrl}
        alt='currentNode'
        width={270}
        height={270}
        className='bg-green-50 rounded-xl hover:cursor-pointer'
      />
      {currentNode.data.isLeaf && (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
          onClick={onClick}
        >
          {text}
        </Button>
      )}
      {error && (
        <Text size='1' color='red'>
          无法设计:(
        </Text>
      )}
    </>
  )
}

export default NodeDetail
