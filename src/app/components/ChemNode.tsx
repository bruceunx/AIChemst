import { memo } from 'react'
import { Flex } from '@radix-ui/themes'
import { Handle, Position, NodeProps } from 'reactflow'
import Image from 'next/image'
import { ChemNodeData } from '../../types'

function ChemNode({ data }: NodeProps<ChemNodeData>) {
  const handleStyle = {
    width: '2px',
    height: '2px',
    borderRadius: '0px',
    marginRight: '1px',
    transform: 'rotate(45deg) translate(1px, 1px)',
    backgroundColor: '#2c344c',
  }

  return (
    <Flex
      direction='column'
      className='relative bg-green-100 w-20 h-20 p-1 rounded-md'
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
