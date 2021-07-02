import { fetchWrapper } from "../helpers/fetch-wrapper";

export const employeeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const baseUrl = "https://localhost:5001/api/employee";

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id) {
  return fetchWrapper.put(`${baseUrl}/${id}`);
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
