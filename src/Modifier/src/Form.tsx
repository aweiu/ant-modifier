import * as React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/es/form'
import ModifierContainer from './Container'
import instances from './instances'

// AntForm 不能再作为 Form.create 的参数，所以再包装一层
class ModifierAntForm extends React.PureComponent {
  render() {
    return <Form {...this.props} />
  }
}

export default class ModifierForm<
  FormData = any,
  CustomData = any
> extends ModifierContainer<FormProps, any, FormData, CustomData> {
  Container = ModifierAntForm

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
