import * as React from 'react'
import { Form } from 'antd'
import { excludeProps } from './utils'

// WrappedFormInternalProps
const EXCLUDE_KEYS = ['form']
export default class ModifierBaseForm extends React.PureComponent {
  render() {
    return <Form {...excludeProps(EXCLUDE_KEYS, this.props)} />
  }
}
