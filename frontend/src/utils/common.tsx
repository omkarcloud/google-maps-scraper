export function create_title(props: any, suffix): string {
  if (props?.title) {
    return `${props.title.trim()} | ${suffix}`
  }
  return suffix
}
