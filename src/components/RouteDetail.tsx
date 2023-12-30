import { Button, Flex, Heading, Text } from '@radix-ui/themes'

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

      {currentNode.data.detail ? (
        <Flex direction='column'>
          <Text>反应溶剂: {JSON.parse(currentNode.data.detail).solvent}</Text>
          <Text>催化剂: {JSON.parse(currentNode.data.detail).catalyst}</Text>
          <Text>
            反应温度: {JSON.parse(currentNode.data.detail).temperature.toFixed(3)}
          </Text>
        </Flex>
      ) : (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
          onClick={onClick}
        >
          {text}
        </Button>
      )}

      {Boolean(Object.keys(selectCondition).length) && (
        <Flex direction='column'>
          <Text>反应溶剂: {selectCondition.solvent}</Text>
          <Text>催化剂: {selectCondition.catalyst}</Text>
          <Text>反应温度: {selectCondition.temperature.toFixed(3)}</Text>
        </Flex>
      )}
      {error && (
        <Text size='1' color='red'>
          无法获取条件:( 可以再次尝试获取
        </Text>
      )}
    </>
  )
}

export default RouteDetail
