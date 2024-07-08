// @ts-nocheck
import { AxiosInstance } from 'axios'
import cogoToast from 'cogo-toast-react-17-fix'
import Toast from '../cogo-toast'

import { JSObject } from '@omkar111111/utils/types'
import Router from 'next/router'

function applyInterceptors(AxiosInstance: AxiosInstance) {
  const map = new Map()
  function showLoading(config: JSObject, message: string) {
    const hideFn = cogoToast.loading(message, {
      hideAfter: 0,
      position: 'bottom-right',
    }).hide!
    map.set(config, hideFn)
  }

  function hideLoading(config: JSObject) {
    const hidefn = map.get(config)
    if (hidefn) {
      hidefn()
    }
  }

  const HTTP_STATUS_ENTITY_TOO_LARGE = 413

  function handleAxiosError(error: any) {
    console.error(error)
    if (error.response) {
      if (error.response.status === HTTP_STATUS_ENTITY_TOO_LARGE) {
        Toast.error('Please upload smaller files.')
      } else if (error.response.data.message) {
        Toast.error(error.response.data.message)
      } else {
        Toast.error('Something went wrong, please try again later.')
      }
    } else {
      Toast.error('Something went wrong, please try again later.')
    }
  }

  function redirectIfShouldRedirect(response: any) {
    if (response?.data?.redirect) {
      Router.push(response.data.redirect)
      return true
    }
    return false
  }

  function is404(res: any) {
    return res?.status === 404
  }

  AxiosInstance.interceptors.request.use(
    (config: any) => {
      if (config.silent) {
        return config
      }
      showLoading(config, config.message ? config.message : 'Submitting')

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  AxiosInstance.interceptors.response.use(
    response => {
      hideLoading(response.config)
      redirectIfShouldRedirect(response)
      return response
    },
    error => {
      hideLoading(error.config)
      let isRedirected = redirectIfShouldRedirect(error.response)
      if (error.config?.redirectToSignInOn404 && is404(error.response)) {
        Router.push('/auth/sign-in')
        isRedirected = true
      }
      if (error.config?.silenceError) {
        return Promise.reject(error)
      } else {
        if (!isRedirected) {
          // fetch request abortion
          if (error.message === 'canceled'){
            return Promise.reject(error)
          }
          handleAxiosError(error)
        }
        return Promise.reject(error)
      }
    }
  )
}
export default applyInterceptors
