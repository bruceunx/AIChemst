import { Button, Heading, Text } from '@radix-ui/themes'

import { RouteProps } from '@/types'

const RouteDetail: React.FC<RouteProps> = ({ currentNode }) => {

	const onClick = () => {

	}
  return (
    <>
      <Heading>反应条件筛选</Heading>

      {!currentNode.data.detail ? (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
					onClick={onClick}
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
