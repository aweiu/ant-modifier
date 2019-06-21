import * as React from 'react'
import { Form } from 'antd'
import instances from './instances'
import { FormCreateOption } from 'antd/es/form'
import { RcBaseFormProps, WrappedFormUtils } from 'antd/es/form/Form'
import Context from './Context'
import { excludeProps } from './utils'

type Overwrite<A extends object, B extends object> = Pick<
  A,
  Exclude<keyof A, keyof B>
> &
  B

export interface ModifierContainerProps<FormData, CustomData> {
  name: string
  action: (formData: FormData, customData: CustomData) => any
}

// FormCreateOption & ModifierContainerProps
const EXCLUDE_KEYS = [
  'name',
  'action',
  'onFieldsChange',
  'onValuesChange',
  'mapPropsToFields',
  'validateMessages',
  'withRef',
]

export default abstract class ModifierContainer<
  Props,
  State,
  FormData,
  CustomData,
  InjectProps extends string = any
> extends React.PureComponent<
  // 防止某些组件中存在和 ModifierContainerProps 中同名的 prop
  // 会在交叉后生成一些不可能的类型 比如 Form 中的 action，会导致 action 既是 FormProps.action 又是 ModifierContainerProps.action
  Overwrite<
    // @ts-ignore
    Props,
    FormCreateOption<any> & ModifierContainerProps<FormData, CustomData>
  >,
  State
> {
  FormContainer!: React.ComponentType<RcBaseFormProps>
  formContainer = React.createRef()
  rcForm = React.createRef()

  abstract Container: React.ComponentType

  static getForm(name: string) {
    const instance = instances.get(name)
    if (instance) return instance.form
  }

  componentWillMount() {
    const name = this.props.name
    // 为了干掉 Form.create ，rcForm 的创建只能是动态的，它也因此变成了当前组件的子组件
    this.FormContainer = Form.create(this.props)(this.Container)
    instances.set(name, this)
  }

  componentDidMount() {
    // 为了干掉 Form.create ，rcForm 的创建只能是动态的，它也因此变成了当前组件的子组件
    // 然后它内部是调用 forceUpdate 实现的组件更新，由于不是同域加上 Context 的更新机制，必须得触发当前组件的更新才可以重新渲染 Item
    // 于是有了下面这两行黑科技：把 rcForm 的 forceUpdate 劫持到当前组件实例
    const rcForm: any = this.rcForm.current
    rcForm.forceUpdate = () => this.forceUpdate()
    // 在这里调一次强更来初始化 this.form，可以保证 Provider Value 有值，继而成功渲染 Item
    this.forceUpdate()
  }

  componentWillUnmount() {
    instances.delete(this.props.name)
  }

  get form(): WrappedFormUtils {
    const formContainer = this.formContainer.current
    return formContainer && (formContainer as any).props.form
  }

  render(injectProps?: Props) {
    const FormContainer = this.FormContainer

    return (
      <FormContainer
        {...excludeProps(EXCLUDE_KEYS, this.props)}
        {...injectProps}
        ref={this.rcForm}
        wrappedComponentRef={this.formContainer}
      >
        <Context.Provider value={this.form}>
          {this.props.children}
        </Context.Provider>
      </FormContainer>
    )
  }
}
