import { FormProps } from 'antd/es/form'
import ModifierContainer from './Container'
import instances from './instances'
import BaseForm from './BaseForm'

export default class ModifierForm<
  FormData = any,
  CustomData = any
> extends ModifierContainer<FormProps, any, FormData, CustomData> {
  Container = BaseForm // 如果直接使用 AntForm 会有问题，需要对 prop 进行过滤处理

  static submit<CustomData = any>(name: string, customData?: CustomData) {
    const instance = instances.get<ModifierForm>(name)
    return instance ? instance.submit(customData) : Promise.resolve()
  }

  submit = (customData: CustomData) => {
    const { action } = this.props
    return new Promise((resolve) => {
      this.form.validateFields((err, formData: FormData) => {
        if (!err) resolve(action(formData, customData))
      })
    })
  }
}
