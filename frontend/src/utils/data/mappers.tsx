export function formatDate(value: any) {
  const date = new Date(value)
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 // Months start at 0!
  let dd = date.getDate()

  // @ts-ignore
  if (dd < 10) dd = `0${dd}`

  // @ts-ignore
  if (mm < 10) mm = `0${mm}`

  const formatted = `${dd}/${mm}/${yyyy}`

  return formatted
}
