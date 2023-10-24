export type ChemNodeData = {
  isTarget?: boolean | undefined
  isLeaf?: boolean | undefined
  imgUrl: string
}

export type ChemData = {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  data: ChemData
}
