import * as React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/es/form'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form'
import Context from './Context'
import { excludeProps } from './utils'

export interface ModifierItemProps<FormData> {
  id: keyof FormData
}

const EXCLUDE_KEYS = ['id']
export default class ModifierItem<FormData = any> extends React.PureComponent<
  ModifierItemProps<FormData> & FormItemProps & GetFieldDecoratorOptions
> {
  renderFormItem = (form: WrappedFormUtils) => {
    return form ? (
      <Form.Item {...excludeProps(EXCLUDE_KEYS, this.props)}>
        {form.getFieldDecorator<FormData>(this.props.id, this.props)(
          this.props.children,
        )}
      </Form.Item>
    ) : null
  }

  render() {
    return <Context.Consumer>{this.renderFormItem}</Context.Consumer>
  }
}
