import axios from 'axios';
import { getToken } from './AuthService';

// axios.interceptors.request.use(function (config) {
    
//     config.headers['Authorization'] = getToken();
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );
const BASE_URL = 'http://localhost:8080/api/todos'

export const listTodos = () => axios.get(BASE_URL)

export const addToDo = (todo) => axios.post(BASE_URL, todo)

export const getTodo = (id) => axios.get(BASE_URL+"/"+id)

export const updateTodo = (id, todo) => axios.put(BASE_URL+"/"+id, todo)

export const deleteTodo = (id) => axios.delete(BASE_URL+"/"+id)

export const completeTodo = (id) => axios.patch(BASE_URL+"/"+id+"/complete")

export const reopenTodo = (id) => axios.patch(BASE_URL+"/"+id+"/incomplete")

