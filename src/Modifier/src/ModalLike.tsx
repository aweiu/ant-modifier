import * as React from 'react'
import ModifierContainer from './Container'
import instances from './instances'

type AnyFunction = (...args: any) => any
type InjectProps = 'visible' | 'confirmLoading' | 'onOk' | 'onCancel'

export interface ModifierModalLikeState {
  visible: boolean
  confirmLoading: boolean
}

export interface ModifierModalLikeProps {
  visible?: boolean
  confirmLoading?: boolean
  onOk?: AnyFunction
  onCancel?: AnyFunction
}

// TODO 这部分逻辑后期考虑使用 hooks 抽象
// 这里其实也可以实现成高阶组件（外部传入 Container），但是这样返回的组件在调用时会失去 props 提示，原因不明
export default abstract class ModifierModalLike<
  FormData,
  CustomData,
  ModalLikeProps extends ModifierModalLikeProps
> extends ModifierContainer<
  ModalLikeProps,
  ModifierModalLikeState,
  FormData,
  CustomData,
  InjectProps
> {
  abstract Container: React.ComponentType<ModalLikeProps>
  customData?: CustomData

  static show<CustomData = any>(name: string, customData?: CustomData) {
    const modal = instances.get<ModifierModalLike<any, any, any>>(name)
    if (modal) modal.show(customData)
  }

  state = {
    visible: false,
    confirmLoading: false,
  }

  show = (customData?: CustomData) => {
    this.customData = customData
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  onOk = () => {
    const { action } = this.props
    this.form.validateFields(async (err, formData: FormData) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        })
        try {
          await action(formData, this.customData as CustomData)
          this.setState({
            confirmLoading: false,
            visible: false,
          })
          this.form.resetFields()
        } catch (e) {
          console.error(e)
          this.setState({
            confirmLoading: false,
          })
        }
      }
    })
  }

  render() {
    // @ts-ignore
    return super.render({
      ...this.state,
      onOk: this.onOk,
      onCancel: this.hide,
    })
  }
}
