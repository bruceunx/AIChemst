import Image from 'next/image'
import { Button } from '@radix-ui/themes'

import { NodeProps } from '@/types'

const NodeDetail: React.FC<NodeProps> = ({ imgUrl, isExpand }) => {
  return (
    <>
      <Image
        src={imgUrl}
        alt='sample'
        width={270}
        height={270}
        className='bg-green-50 rounded-xl hover:cursor-pointer'
      />
      {isExpand && (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
        >
          开始AI设计
        </Button>
      )}
    </>
  )
}

export default NodeDetail
