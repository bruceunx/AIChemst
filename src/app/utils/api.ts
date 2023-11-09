import axios from 'axios'

const API = 'http://127.0.0.1:8000/v1'

export const findSmiles = async (input: string) => {
  try {
    const res = await axios.get(
      `https://cactus.nci.nih.gov/chemical/structure/${input}/smiles`,
    )
    if (res.status === 500) {
      return null
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
