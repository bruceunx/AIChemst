import { Flex, Link, Text } from '@radix-ui/themes'

export default function Nav() {
  return (
    <Flex
      className='h-[95vh] w-28'
      mt='8'
      p='2'
      pt='5'
      position='fixed'
      direction='column'
      align='center'
      justify='between'
      style={{ backgroundColor: 'var(--gray-a6)' }}
    >
      <Flex direction='column' gap='2'>
        <Link href="/" className='no-underline'>当前查询</Link>
        <Link href="/profile" className='no-underline'>用户信息</Link>
        <Link href="/history" className='no-underline'>历史查询</Link>
      </Flex>
      <Flex direction='column'>
        <Text size='1' color='ruby'>
          wx: labnetworks
        </Text>
        <Text size='1' color='blue'>
          辅助功能开发中
        </Text>
      </Flex>
    </Flex>
  )
}
