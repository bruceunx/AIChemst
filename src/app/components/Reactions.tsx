import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes'

const Reactions: React.FC = () => {
  return (
    <>
      <Flex
        className='w-full h-[230px]'
        align='center'
        justify='center'
        direction='row'
        gap='8'
      >
        <Text>路线1</Text>
        <Text>可靠性: 0.99</Text>
        <Image
          src='/assets/reaction1.svg'
          alt='reaction1'
          width={800}
          height={200}
          className='bg-green-50'
        />
      </Flex>
      <Flex
        className='w-full h-[230px]'
        align='center'
        justify='center'
        direction='row'
        gap='8'
      >
        <Text>路线1</Text>
        <Text>可靠性: 0.99</Text>
        <Image
          src='/assets/reaction1.svg'
          alt='reaction1'
          width={800}
          height={200}
          className='bg-green-50'
        />
      </Flex>
      <Flex
        className='w-full h-[230px]'
        align='center'
        justify='center'
        direction='row'
        gap='8'
      >
        <Text>路线1</Text>
        <Text>可靠性: 0.99</Text>
        <Image
          src='/assets/reaction1.svg'
          alt='reaction1'
          width={800}
          height={200}
          className='bg-green-50'
        />
      </Flex>
    </>
  )
}

export default Reactions
