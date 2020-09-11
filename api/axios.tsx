import axios from 'axios';

const SERVER = 'https://122891fc5350.ngrok.io';
const axiosInstance = axios.create({
  baseURL: SERVER
})

export default axiosInstance;