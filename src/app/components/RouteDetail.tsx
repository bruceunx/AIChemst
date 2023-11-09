import { Button, Heading, Text } from '@radix-ui/themes'

import { RouteProps } from '@/types'
import { findConditions } from '../utils/api'
import { useState } from 'react'

const RouteDetail: React.FC<RouteProps> = ({
  setConditions,
  currentNode,
  selectCondition,
}) => {
  const [text, setText] = useState<string>('反应条件筛选')
  const [error, setError] = useState<boolean>(false)
  const onClick = async () => {
    setError(false)
    setText('正在筛选中...')
    const result = await findConditions(
      currentNode.data.reactants,
      currentNode.data.product,
    )
    if (result !== null) {
      setConditions(result)
    } else {
      setError(true)
    }
    setText('反应条件筛选')
  }
  return (
    <>
      <Heading>反应条件筛选</Heading>

      {!currentNode.data.detail && (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
          onClick={onClick}
        >
          {text}
        </Button>
      )}

      <Text size='2' className='break-all'>{selectCondition}</Text>
      {error && (
        <Text size='1' color='red'>
          无法设计:(
        </Text>
      )}
    </>
  )
}

export default RouteDetail
