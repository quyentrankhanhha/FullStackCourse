import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, { data: id });
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  del
};
