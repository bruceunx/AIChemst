import Image from 'next/image'
import { Button } from '@radix-ui/themes'

import { NodeProps } from '@/types'

const NodeDetail: React.FC<NodeProps> = ({ imgUrl, isExpand }) => {

	const onClick = async () => {

    // const smiles = await findSmiles(input)
    // if (smiles === null) {
    //   setError(true)
    // } else {
    //   const routes = await findRoutes(smiles)
    //   if (routes === null) {
    //     setError(true)
    //   } else {
    //
    //     const svg = await getChemicalSVG(smiles)
    //     if (svg !== null) {
    //       const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`
    //       let node = {
    //         id: 'target_0',
    //         type: 'chemNode',
    //         data: { imgUrl: svgUrl, isLeaf: false, smiles: smiles },
    //         position: { x: 300, y: 70 },
    //       }
    //       setCurrentNode(node)
    //       setNodes([node])
    //       setEdges([])
				// 	setRoutes(routes)
    //     }
    //   }
    // }
    // setText('开始查询')

	}

  return (
    <>
      <Image
        src={imgUrl}
        alt='sample'
        width={270}
        height={270}
        className='bg-green-50 rounded-xl hover:cursor-pointer'
      />
      {isExpand && (
        <Button
          radius='full'
          className='hover:cursor-pointer'
          variant='outline'
					onClick={onClick}
        >
          开始AI设计
        </Button>
      )}
    </>
  )
}

export default NodeDetail
