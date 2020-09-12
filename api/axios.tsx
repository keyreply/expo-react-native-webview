import axios, { AxiosInstance } from 'axios';

function initAxios(SERVER: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: SERVER
  })

  return axiosInstance;
}

export default initAxios;