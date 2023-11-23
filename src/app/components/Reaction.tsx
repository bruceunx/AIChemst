import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getReactionSVG } from '../utils/api'

const Reaction: React.FC<any> = ({ route, target, idx }) => {
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    const updateSvg = async () => {
      const res = await getReactionSVG(route.outcome, target)
      if (res === null) {
        console.log('error from svg fetching')
      } else {
        const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`
        setSvg(svgUrl)
      }
    }
    updateSvg()
    // eslint-disable-next-line
  }, [])

  return (
    <Flex
      className='w-full h-[200px]'
      align='center'
      justify='center'
      direction='row'
      gap='8'
      style={{ backgroundColor: 'var(--gray-a4)' }}
    >
      <Text>路线: {route.rank}</Text>
      <Text>可靠性:{route.plausibility.toFixed(4)}</Text>
      {svg && (
        <Image
          src={svg}
          alt='reaction1'
          width={800}
          height={200}
          className='bg-green-50 rounded-xl p-2'
        />
      )}
      <RadioGroup.Item value={idx} />
    </Flex>
  )
}

export default Reaction
