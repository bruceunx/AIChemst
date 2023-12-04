'use client'
import { Flex, Heading, Button } from '@radix-ui/themes'
import { ExitIcon } from '@radix-ui/react-icons'
import Profile from './Profile'

export default function Header() {
  const onExit = () => {
    console.log('onExit')
  }

  return (
    <Flex
      direction='row'
      height='8'
      width='100%'
      position='fixed'
      align='center'
      justify='between'
      p='2'
      style={{ backgroundColor: 'var(--gray-a7)' }}
    >
      <Heading size='6'>AI辅助合成设计</Heading>

      <Flex gap='1'>
        <Profile />
        <Button variant="soft" onClick={onExit} className='hover: cursor-pointer'>
          <ExitIcon />
        </Button>
      </Flex>
    </Flex>
  )
}
