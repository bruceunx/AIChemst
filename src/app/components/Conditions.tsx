import React, { useEffect, useState } from 'react'
import { Flex, Heading, RadioGroup } from '@radix-ui/themes'
import Condition from './Condition'
import { useReactFlow } from 'reactflow'

const Conditions: React.FC<any> = ({
  conditions,
  currentNode,
  setSelectCondition,
}) => {
  const { setNodes } = useReactFlow()

  const [value, setValue] = useState<string>('0')

  const onChange = (value: string) => {
    setValue(value)
    const condition = conditions[parseInt(value) - 1]
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === currentNode.id) {
          node.data = { ...node.data, detail: JSON.stringify(condition) }
        }
        return node
      }),
    )
    setSelectCondition(
      `催化剂-${condition.catalyst} | 溶剂 - ${condition.solvent} | 温度 - ${condition.temperature.toFixed(2)}`,
    )
  }
  useEffect(() => {
    setValue('0')
  }, [currentNode])

  return (
    <RadioGroup.Root onValueChange={onChange} value={value}>
      <Flex direction='column' width='100%' gap='4'>
        <Flex
          className='w-full p-2'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Heading size='4' className='w-32'>
            条件编号
          </Heading>
          <Heading size='4' className='w-32'>
            评分
          </Heading>
          <Heading size='4' className='w-48'>
            试剂
          </Heading>
          <Heading size='4' className='w-56'>
            溶剂
          </Heading>
          <Heading size='4' className='w-32'>
            催化剂
          </Heading>
          <Heading size='4' className='w-32'>
            反应温度
          </Heading>
          <Heading size='4'>是否选择</Heading>
        </Flex>
        {conditions.map((condition: any, idx: number) => (
          <Condition condition={condition} idx={idx} key={idx} />
        ))}
      </Flex>
    </RadioGroup.Root>
  )
}

export default Conditions
