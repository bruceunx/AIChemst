import { Flex, RadioGroup, Text } from '@radix-ui/themes'

const Condition: React.FC<any> = ({ condition, idx }) => {
  return (
    <Flex
      className='w-full h-fit'
      align='center'
      justify='center'
      direction='row'
      gap='8'
      style={{ backgroundColor: 'var(--gray-a4)' }}
    >
      <Text size='4' className='w-32'>
        {idx + 1}
      </Text>
      <Text size='4' className='w-32'>
        {condition.score.toFixed(4)}
      </Text>
      <Text size='4' className='w-48'>
        {condition.reagetn}
      </Text>
      <Text size='4' className='w-56'>
        {condition.solvent}
      </Text>
      <Text size='4' className='w-32'>
        {condition.catalyst}
      </Text>
      <Text size='4' className='w-32'>
        {condition.temperature.toFixed(3)}
      </Text>
      <RadioGroup.Item value={idx + 1} />
    </Flex>
  )
}

export default Condition
