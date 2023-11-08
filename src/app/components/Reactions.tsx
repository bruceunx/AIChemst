import React from 'react'
import { Flex, Heading, RadioGroup } from '@radix-ui/themes'
import Reaction from './Reaction'
import { useReactFlow } from 'reactflow'
import { getChemicalSVG } from '../utils/api'

let id = 1

const Reactions: React.FC<any> = ({ routes, target }) => {
  const generateNode = async (smiles: string, idx: number) => {
    const svg = await getChemicalSVG(smiles)
    if (svg === null) {
      return null
    } else {
      const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`
      return {
        id: `chemNode_${id++}`,
        type: 'chemNode',
        data: { imgUrl: svgUrl, isLeaf: true },
        position: { x: 50, y: 50 + idx * 100 },
      }
    }
  }

  const generateEdge = (chemNode: any, reactionNode: any) => {
    return {
      id: `e${chemNode.id}-${reactionNode.id}`,
      source: `${chemNode.id}`,
      target: `${reactionNode.id}`,
      type: 'smoothstep',
    }
  }

  const { addEdges, addNodes } = useReactFlow()
  const onChange = async (value: string) => {
    const route = routes[parseInt(value) - 1]
    const reactants = route.smiles_split

    let newChemNodes = []

    for (let i = 0; i < reactants.length; i++) {
      let node = await generateNode(reactants[i], i)
      if (node !== null) {
        newChemNodes.push(node)
      }
    }

    let newReactionNode = {
      id: `reactionNode_${id++}`,
      type: 'reactionNode',
      data: { condition: '#2' },
      position: { x: 550, y: 100 },
    }

    let newEdges = newChemNodes.map((chemNode: any) =>
      generateEdge(chemNode, newReactionNode),
    )

    newChemNodes.push(newReactionNode)
    addNodes(newChemNodes)
    addEdges(newEdges)
  }
  return (
    <RadioGroup.Root onValueChange={onChange}>
      <Flex direction='column' width='100%' gap='4'>
        <Flex
          className='w-full p-2'
          align='center'
          justify='center'
          direction='row'
          gap='8'
          style={{ backgroundColor: 'var(--gray-a4)' }}
        >
          <Heading size='4'>路线编号</Heading>
          <Heading size='4'>设计可靠性</Heading>
          <Heading size='4' className='text-center w-[800px]'>
            反应路线
          </Heading>
          <Heading size='4'>是否选择</Heading>
        </Flex>
        {routes.map((route: any, idx: number) => (
          <Reaction route={route} target={target} key={idx} />
        ))}
      </Flex>
    </RadioGroup.Root>
  )
}

export default Reactions
