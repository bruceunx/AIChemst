import { Button, Heading, Text } from '@radix-ui/themes'

import { RouteProps } from '@/types'

const RouteDetail: React.FC<RouteProps> = ({ serial, isExpand }) => {
  return (
    <>
      <Heading>反应条件筛选</Heading>
      <Text>反应编号: {serial}</Text>

      {isExpand ? (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
        >
          反应条件筛选
        </Button>
      ) : (
        <Text>反应条件</Text>
      )}
    </>
  )
}

export default RouteDetail
