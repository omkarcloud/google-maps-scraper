import axios from 'axios'
import applyInterceptors from './apply-interceptors'

function isLocal() {

  // Check if window is defined
  if (typeof window === 'undefined') {
    return false
  }
  // Extract the hostname from the current URL
  const hostname = window.location.hostname

  // Check for localhost addresses and return '' if matched
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'
  ) {
    return true
  }

  // Return the current page URL enclosed in double quotes if none of the above conditions are met
  return false
}
// PREFER LOCAL URL, AS PROXYING VIA NEXT LEADS TO SOCKET HANGUP ERRORS
export const frontendBaseURL = isLocal() ? 'http://127.0.0.1:8000/api' :'/api'


const FrontendAxios = axios.create({
  baseURL: frontendBaseURL,
})

applyInterceptors(FrontendAxios)
export default FrontendAxios
