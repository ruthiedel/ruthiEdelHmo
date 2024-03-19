import axios from 'axios'
const url = "http://localhost:8000"

const axiosInstance = axios.create({ baseURL: url })


export default axiosInstance