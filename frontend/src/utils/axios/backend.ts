import axios from 'axios'
import fetchAdapter from './fetch-adapter'

export const backendBaseURL = 'http://127.0.0.1:8000/api'

const BackendAxios = axios.create({
  baseURL: backendBaseURL,
  adapter: fetchAdapter as any,
})

export default BackendAxios
