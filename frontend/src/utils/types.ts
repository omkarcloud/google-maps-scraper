export type WithData<A> = {
  data: A
}

export type WithRefetch = { refetch: () => void }
export type WithLabel = { label: string }

export type WithOnChange<T = string> = {
  onChange: (value: T) => void
}

export type WithValue<T = string> = {
  value: T
}

export type VandC<A = string> = WithValue<A> & WithOnChange<A>
export type F1<A> = (a: A) => void

export type WithPaginationResponse<A> = {
  count: number
  next: string | null
  previous: string | null
  results: A[]
}
