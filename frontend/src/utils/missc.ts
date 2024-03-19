import Language from '@omkar111111/utils/language'
import { AxiosResponse } from 'axios'

export async function getDataFromAxiosResponse(res: Promise<AxiosResponse>) {
  try {
    return (await res).data
  } catch (e: any) {
    const data = e.response?.data
    return data
  }
}

export function isEmpty(x: any) {
  return (
    x === null ||
    x === undefined ||
    x === '' ||
    (typeof x == 'string' && x?.trim() === '')
  )
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function isNotEmpty(x: any) {
  return !isEmpty(x)
}

export function generateListWithIdAndValue(n) {
  const list = []
  for (let i = 1; i <= n; i++) {
    list.push({ id: i.toString(), value: i.toString() })
  }
  return list
}

export const isStringOrListNotEmpty = (x: any) =>
  typeof x === 'string' ? isNotEmpty(x) : !Language.isListEmpty(x)

export const isStringOrListEmpty = (x: any) => !isStringOrListNotEmpty(x)
