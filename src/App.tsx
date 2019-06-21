import React from 'react'
import { Button, Form, Input } from 'antd'
import { hot } from 'react-hot-loader'
import * as Modifier from './Modifier/src'

interface FormData {
  name: string
}

type CustomData = string

function submit(formData: FormData, customData: CustomData) {
  console.log(formData, customData)
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

function showModifierModal1() {
  Modifier.Modal.show('modifierModal1', 'customData1')
}

function showModifierModal2() {
  Modifier.Modal.show('modifierModal2', 'customData2')
}

function submitModifierForm() {
  console.log(Modifier.getForm('modifierForm'))
  Modifier.Form.submit('modifierForm', 'customData')
}

const App: React.FC = () => {
  return (
    <div>
      <Button type="primary" onClick={showModifierModal1}>
        ModifierModal1
      </Button>
      <Button type="primary" onClick={showModifierModal2}>
        ModifierModal2
      </Button>

      <Modifier.Modal<FormData, CustomData>
        name="modifierModal1"
        action={submit}
        title="Hello Ant ModifierModal1"
        okText="确定"
        cancelText="取消"
        onValuesChange={() => console.log('ModifierModal1 change')}
      >
        <Form>
          <Modifier.Item<FormData> id="name" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名1" />
          </Modifier.Item>
        </Form>
      </Modifier.Modal>

      <Modifier.Modal<FormData, CustomData>
        name="modifierModal2"
        action={submit}
        title="Hello Ant ModifierModal2"
        okText="确定"
        cancelText="取消"
        onValuesChange={() => console.log('ModifierModal2 change')}
      >
        <Form>
          <Modifier.Item<FormData> id="name" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名2" />
          </Modifier.Item>
        </Form>
      </Modifier.Modal>
      <Modifier.Form<FormData, CustomData>
        name="modifierForm"
        action={submit}
        onValuesChange={() => console.log('ModifierForm change')}
      >
        <Modifier.Item<FormData> id="name" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Modifier.Item>
        <Button onClick={submitModifierForm}>提交</Button>
      </Modifier.Form>
    </div>
  )
}

export default hot(module)(App)
