import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API = "https://apichem.pylogic.net/v1";

export const findSmiles = async (input: string) => {
  try {
    const url = `${API}/product/name2smiles`;
    const data = { name: input };
    const res = await axios.post(url, data);
    if (res.status == 404) {
      return input;
    } else {
      return res.data.smiles;
    }
  } catch (err) {
    return null;
  }
};

export const findRoutes = async (smiles: string) => {
  const token = await getToken();
  if (token === null) {
    return null;
  }
  const headers = { token: token };
  const url = `${API}/product/routes`;
  const data = { smiles: smiles };
  try {
    const res = await axios.post(url, data, { headers: headers });
    if (res.status === 200) {
      return res.data.routes;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const findConditions = async (reactants: string, product: string) => {
  const token = await getToken();
  if (token === null) {
    return null;
  }
  const headers = { token: token };
  const url = `${API}/product/conditions`;
  const data = { reactants: reactants, product: product };
  try {
    const res = await axios.post(url, data, { headers: headers });
    if (res.status === 200) {
      return res.data.conditions;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const getReactionSVG = async (reactants: string, product: string) => {
  const url = `${API}/product/getreactionsvg`;
  const data = { reactants: reactants, product: product };
  try {
    const res = await axios.post(url, data);
    if (res.status === 200) {
      return res.data.svg;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const getChemicalSVG = async (smiles: string) => {
  const url = `${API}/product/getchemicalsvg`;
  const data = { smiles: smiles };
  try {
    const res = await axios.post(url, data);
    if (res.status === 200) {
      return res.data.svg;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const getToken = async () => {
  let token = localStorage.getItem("token");
  if (token === null) {
    const url = `${API}/user/apitoken`;
    const res = await axios.post(url, { uid: uuidv4() });
    if (res.status === 200) {
      token = `Bearer ${res.data.access_token}`;
      localStorage.setItem("token", token);
      return token;
    } else {
      return null;
    }
  }
  return token;
};
