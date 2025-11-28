import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth'

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
//   ,
//   { synchronous: true, runWhen: () => {} }
);

export const register = (registration) => axios.post(BASE_URL+"/register", registration)

export const login = (loginData) => axios.post(BASE_URL+"/login", loginData)

export const storeToken = (token) => localStorage.setItem("token", token)

export const getToken = () => localStorage.getItem("token")

export const storeUser = (userName) => sessionStorage.setItem("auth-user", userName)

export const getUser = () => sessionStorage.getItem("auth-user")

export const isUserLoggedIn = () => getUser() == null ? false : true

export const storeUserRole = (role) => sessionStorage.setItem("user-role", role)

export const getUserRole = () => sessionStorage.getItem("user-role")

export const isUserAdmin = () => {
  let role = getUserRole()
  if(role != null && role === 'ROLE_ADMIN'){
    return true
  }
  return false
}

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}
