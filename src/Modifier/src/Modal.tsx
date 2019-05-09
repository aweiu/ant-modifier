import { Modal } from 'antd'
import ModifierContainer from './Container'
import { ModalProps } from 'antd/es/modal'
import instances from './instances'

interface ModalModifierState {
  visible: boolean
  confirmLoading: boolean
}

type InjectProps = 'visible' | 'confirmLoading' | 'onOk' | 'onCancel'

export default class ModifierModal<
  FormData = any,
  CustomData = any
> extends ModifierContainer<
  ModalProps,
  ModalModifierState,
  FormData,
  CustomData,
  InjectProps
> {
  Container = Modal
  customData?: CustomData

  static show<CustomData = any>(name: string, customData?: CustomData) {
    const modalModifier = instances.get<ModifierModal>(name)
    if (modalModifier) modalModifier.show(customData)
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
        this.setState({ confirmLoading: true })
        try {
          await action(formData, this.customData as CustomData)
          this.setState({ confirmLoading: false, visible: false })
        } catch (e) {
          console.error(e)
          this.hide()
        }
      }
    })
  }

  render() {
    return super.render({
      ...this.state,
      onOk: this.onOk,
      onCancel: this.hide,
    })
  }
}
