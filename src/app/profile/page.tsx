import { Flex, Text, Heading } from '@radix-ui/themes'

export default function Profile() {
  return (
    <Flex
      className='w-1/2 mx-auto m-7 p-2 rounded-xl border-solid border-2 border-blue-500'
      direction='column'
      gap='4'
    >
      <Heading align='center'>个人信息</Heading>
      <Text>邮箱: </Text>
      <Text>其他信息: </Text>
    </Flex>
  )
}
