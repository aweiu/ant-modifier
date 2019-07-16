export function excludeProps(keys: string[], props: any) {
  const newProps: any = { ...props }
  for (let key of keys) {
    delete newProps[key]
  }
  return newProps
}
