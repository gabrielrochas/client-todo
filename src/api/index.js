import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertToDo = (todo) => api.post(`/todos`, todo);
export const updateToDo = (id, payload) => api.put(`/todos/${id}`, payload);
export const deleteToDo = (id) => api.delete(`/todos/${id}`);
export const getToDo = (id) => api.get(`/todos/${id}`);
export const getToDos = () => api.get(`/todos`);

const apis = {
  insertToDo,
  updateToDo,
  deleteToDo,
  getToDo,
  getToDos,
};

export default apis;
