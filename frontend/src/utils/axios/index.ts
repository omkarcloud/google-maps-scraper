import BackendAxios, { backendBaseURL } from './backend'
import FrontendAxios, { frontendBaseURL } from './frontend'

const AxiosInstance =
  typeof window === 'undefined' ? BackendAxios : FrontendAxios

export const baseUrl =
  typeof window === 'undefined' ? backendBaseURL : frontendBaseURL

export default AxiosInstance
