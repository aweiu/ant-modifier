import * as React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/es/form'
import ModifierContainer from './Container'
import instances from './instances'
import { excludeProps } from './utils'

// AntForm 不能再作为 Form.create 的参数，所以再包装一层
class ModifierAntForm extends React.PureComponent {
  render() {
    return <Form {...excludeProps(['form'], this.props)} />
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
    return new Promise((resolve, reject) => {
      this.form.validateFields((err, formData: FormData) => {
        if (err) reject(err)
        else resolve(action(formData, customData))
      })
    })
  }
}
