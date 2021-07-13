import { fetchWrapper } from "../helpers/fetch-wrapper";

export const jobService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const baseUrl = "http://localhost:5000/api/job";

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, body) {
  return fetchWrapper.put(`${baseUrl}/${id}`, body);
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
