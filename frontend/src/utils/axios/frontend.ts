import axios from 'axios'
import applyInterceptors from './apply-interceptors'

export const frontendBaseURL = '/api'

const FrontendAxios = axios.create({
  baseURL: frontendBaseURL,
})

applyInterceptors(FrontendAxios)
export default FrontendAxios
