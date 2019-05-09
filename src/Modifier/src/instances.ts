import Container from './Container'

class Instances<T extends Container<any, any, any, any>> extends Map<
  string,
  T
> {
  set(name: string, instance: T) {
    if (this.has(name)) throw Error(`The Modifier name: ${name} has been used`)
    super.set(name, instance)
    return this
  }
  get<P extends T>(name: string): P | undefined {
    if (!this.has(name)) console.warn(`The Modifier name: ${name} is not exist`)
    return super.get(name) as any
  }
}

export default new Instances()
