import axios from 'axios'

const API = 'https://apichem.pylogic.net/v1'

export const findSmiles = async (input: string) => {
  try {
    const res = await axios.get(
      `https://cactus.nci.nih.gov/chemical/structure/${input}/smiles`,
    )
    if (res.status === 500) {
			const url = `${API}/product/name2smiles`
			const data = {name: input}
			const res = await axios.post(url, data)
			if (res.status == 404){
				return null
			}else{
				return res.data.smiles
			}
    }
    return res.data
  } catch (err) {
    return null
  }
}

export const findRoutes = async (smiles: string) => {
  const url = `${API}/product/routes`
  const data = { smiles: smiles }
  try {
    const res = await axios.post(url, data)
    if (res.status === 200) {
      return res.data.routes
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

export const findConditions = async (reactants: string, product: string) => {
  const url = `${API}/product/conditions`
  const data = { reactants: reactants, product: product }
  try {
    const res = await axios.post(url, data)
    if (res.status === 200) {
      return res.data.conditions
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

export const getReactionSVG = async (reactants: string, product: string) => {
  const url = `${API}/product/getreactionsvg`
  const data = { reactants: reactants, product: product }
  try {
    const res = await axios.post(url, data)
    if (res.status === 200) {
      return res.data.svg
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

export const getChemicalSVG = async (smiles: string) => {
  const url = `${API}/product/getchemicalsvg`
  const data = { smiles: smiles }
  try {
    const res = await axios.post(url, data)
    if (res.status === 200) {
      return res.data.svg
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}
