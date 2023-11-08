import { Button, Flex, Link, Text, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Dispatch, SetStateAction, useState } from 'react'
import { findRoutes, findSmiles, getChemicalSVG } from '../utils/api'
import { Node, useReactFlow } from 'reactflow'

export default function Search({
  setRoutes,
  setCurrentNode,
}: {
  setRoutes: Dispatch<SetStateAction<never[]>>
  setCurrentNode: Dispatch<SetStateAction<Node | null>>
}) {
  const { setEdges, setNodes } = useReactFlow()

  const [input, setInput] = useState<string>('')
  const [text, setText] = useState<string>('开始查询')
  const [error, setError] = useState<boolean>(false)
  const handleClick = async () => {
    setText('查询中...')
    const smiles = await findSmiles(input)
    if (smiles === null) {
      setError(true)
    } else {
      const routes = await findRoutes(smiles)
      if (routes === null) {
        setError(true)
      } else {

        const svg = await getChemicalSVG(smiles)
        if (svg !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`
          let node = {
            id: 'target_0',
            type: 'chemNode',
            data: { imgUrl: svgUrl, isLeaf: false, smiles: smiles },
            position: { x: 300, y: 70 },
          }
          setCurrentNode(node)
          setNodes([node])
          setEdges([])
					setRoutes(routes)
        }
      }
    }
    setText('开始查询')
  }

  return (
    <Flex direction='row' justify='center' gap='2' align='center' p='2'>
      <TextField.Root className='w-64'>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input
          placeholder='输入产品名称或者SMILES来查询'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(false)
          }}
        />
      </TextField.Root>
      {error && (
        <Text size='2' color='red'>
          无法获取路线!
        </Text>
      )}
      <Button onClick={handleClick}>{text}</Button>
      <Link
        size='2'
        href='https://www.rcsb.org/chemical-sketch'
        target='_blank'
      >
        👉按结构图查询SMILES
      </Link>
    </Flex>
  )
}
