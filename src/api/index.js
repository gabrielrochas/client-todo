import axios from "axios";
import env from "react-dotenv"

const api = axios.create({
  baseURL: env.API_URL,
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
