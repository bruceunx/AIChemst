import { memo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Handle, Position, NodeProps } from 'reactflow'
import { ReactNodeData } from '@/types'

function ReactionNode({ data }: NodeProps<ReactNodeData>) {
  const handleStyle = {
    width: '2px',
    height: '2px',
    borderRadius: '2px',
    backgroundColor: '#778899',
  }

  return (
    <Flex
      direction='column'
      className='relative bg-red-400 w-8 h-8 p-1 rounded-full hover:bg-red-600'
    >
      <Handle style={handleStyle} type='target' position={Position.Left} />
      <Text className='text-center'>{data.condition}</Text>
      <Handle style={handleStyle} type='source' position={Position.Right} />
    </Flex>
  )
}
export default memo(ReactionNode)
