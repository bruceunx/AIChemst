import { Dispatch, SetStateAction } from 'react'
import { Node } from 'reactflow'

export type ChemNodeData = {
  isTarget?: boolean | undefined
  isLeaf?: boolean | undefined
  imgUrl: string
}

export type ReactNodeData = {
  condition: string
  reactants: string
  product: string
  detail?: string
}

export type NodeProps = {
  currentNode: Node
  setRoutes: Dispatch<SetStateAction<never[]>>
}

export type RouteProps = {
  currentNode: Node
  setConditions: Dispatch<SetStateAction<never[]>>
  selectCondition: string
}

// export type ChemData = {
//   id: string
//   type: string
//   position: {
//     x: number
//     y: number
//   }
//   data: ChemData
// }
