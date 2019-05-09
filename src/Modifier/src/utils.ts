export function excludeProps(keys: string[], props: any) {
  const newProps: any = {}
  for (let key of Object.keys(props)) {
    if (!keys.includes(key)) newProps[key] = props[key]
  }
  return newProps
}
