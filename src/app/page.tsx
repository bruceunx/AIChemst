import { Flex, Separator } from '@radix-ui/themes'
import Image from 'next/image'
import Search from './components/Search'
import Chart from './components/Chart'

export default function Home() {
  return (
    <Flex direction='column' width='100%'>
      <Search />
      <Separator orientation='horizontal' size='4' />
      <Flex width='100%' className='h-80'>
        <Chart />
      </Flex>
      <Separator orientation='horizontal' size='4' />
      <Flex className='min-h-[300px]' width='100%' direction='row'>
        <Flex className='w-3/4'>
          <p>reaction tables</p>
        </Flex>
        <Flex className='w-1/4 ml-2'>
          <p>current reagent</p>
					<Flex className='w-32 h-32 relative m-4'>
          <Image src='/assets/sample1.svg' alt='sample' fill className='bg-green-50' />
					</Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
