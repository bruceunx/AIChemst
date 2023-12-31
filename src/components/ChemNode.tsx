import { memo } from 'react'
import { Flex } from '@radix-ui/themes'
import { Handle, Position, NodeProps } from 'reactflow'
import Image from 'next/image'
import { ChemNodeData } from '@/types'

function ChemNode({ data }: NodeProps<ChemNodeData>) {
  const handleStyle = {
    width: '2px',
    height: '10px',
    borderRadius: '1px',
    backgroundColor: '#778899',
  }

  return (
    <Flex
      direction='column'
      className='relative bg-green-100 w-20 h-20 p-1 rounded-md hover:bg-green-300'
    >
      <Handle style={handleStyle} type='target' position={Position.Left} />
      <Image src={data.imgUrl} fill alt='chem' />
      {!data.isTarget && (
        <Handle style={handleStyle} type='source' position={Position.Right} />
      )}
    </Flex>
  )
}
export default memo(ChemNode)
