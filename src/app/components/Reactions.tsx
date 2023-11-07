import React from 'react'
import Image from 'next/image'
import { Flex, Heading, RadioGroup, Text } from '@radix-ui/themes'

const Reactions: React.FC<any> = ({ routes }) => {
  console.log(routes)
  const onChange = (value: string) => {
    console.log(value)
  }
  return (
    <RadioGroup.Root onValueChange={onChange}>
      <Flex direction='column' width='100%' gap='4'>
        <Flex
          className='w-full p-2'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Heading size='4'>路线编号</Heading>
          <Heading size='4'>设计可靠性</Heading>
          <Heading size='4' className='text-center w-[800px]'>
            反应路线
          </Heading>
          <Heading size='4'>是否选择</Heading>
        </Flex>
        <Flex
          className='w-full h-[230px]'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Text>路线1</Text>
          <Text>可靠性: 0.99</Text>
          <Image
            src='/assets/reaction1.svg'
            alt='reaction1'
            width={800}
            height={200}
            className='bg-green-50 rounded-xl'
          />
          <RadioGroup.Item value='1' />
        </Flex>
        <Flex
          className='w-full h-[230px]'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Text>路线1</Text>
          <Text>可靠性: 0.99</Text>
          <Image
            src='/assets/reaction1.svg'
            alt='reaction1'
            width={800}
            height={200}
            className='bg-green-50 rounded-xl'
          />
          <RadioGroup.Item value='2' />
        </Flex>
        <Flex
          className='w-full h-[230px]'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Text>路线1</Text>
          <Text>可靠性: 0.99</Text>
          <Image
            src='/assets/reaction1.svg'
            alt='reaction1'
            width={800}
            height={200}
            className='bg-green-50 rounded-xl'
          />
          <RadioGroup.Item value='3' />
        </Flex>
      </Flex>
    </RadioGroup.Root>
  )
}

export default Reactions
