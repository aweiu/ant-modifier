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
export default function createModalLike<T extends ModifierModalLikeProps>(
  ModalLike: React.ComponentType<T>,
) {
  return class ModifierModalLike<
    FormData = any,
    CustomData = any
  > extends ModifierContainer<
    React.ComponentProps<typeof ModalLike>,
    ModifierModalLikeState,
    FormData,
    CustomData,
    InjectProps
  > {
    Container = ModalLike
    customData?: CustomData

    static show<CustomData = any>(name: string, customData?: CustomData) {
      const modal = instances.get<ModifierModalLike>(name)
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
}
