import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

function useAxios<A>(
  requests: () => Promise<any>,
  {
    onSuccess,
    mapData,
  }: { mapData?: (x: any) => any; onSuccess?: (x: any) => any } = {},
  runOnMount = true
) {
  const [data, setData] = useState<undefined | any>(undefined)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [isLoading, setLoading] = useState(runOnMount ? true : false)

  const fetchData = async () => {
    setLoading(true)
    let final = null
    try {
      const result = await Promise.all([requests].map(requests => requests()))
      const datas = result.map(result => result?.data)

      setError(undefined)
      if (datas.length === 1) {
        final = datas[0]
      } else {
        final = datas
      }

      final = mapData ? mapData(final) : final

      onSuccess?.(final)

      setData(final)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error as any)
      setLoading(false)
      throw error
    }
    // setLoading(false);
    return final
  }

  useEffect(() => {
    if (runOnMount) {
      fetchData()
    }
  }, [])

  return {
    data: data as A | undefined,
    fetch: fetchData,
    refetch: fetchData,
    error,
    isLoading,
  }
}

function useLazyAxios<A>(requests: () => Promise<any>, options = {}) {
  return useAxios(requests, options, false)
}

export { useAxios, useLazyAxios }
export default useAxios
