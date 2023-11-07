import axios from 'axios'

const API = "http://127.0.0.1:8000/v1"

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
      return res.data
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}
