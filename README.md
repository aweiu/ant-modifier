# ant-modifier

如果你受够了 AntDesign 的原生 Form，那就来试试它吧！一款更懂你的表单提交组件

## 介绍

目前功能：

- 简化 AntForm 的使用（众所周知，AntForm 用起来很麻烦...
- 提交数据之前自动执行校验
- 通过 Modifier.Modal 提交数据，弹窗会自动管理 loading 和 显隐 状态

计划实现：

- 提交数据之前自动对比表单数据，如果有变化才会执行并回调数据的异同部分
- 归一化处理所有需要额外请求的字段，比如：文件和图片的上传

## 安装

```
npm install ant-modifier
```

## 调试

```
git clone https://github.com/aweiu/ant-modifier.git
yarn install
yarn run start
```

## 使用

`react >= 16.3.0` `webpack es6 开发环境`

建议配合 [TypeScript](https://www.tslang.cn/) 食用！调试本项目你得到的就是一份同时支持 js 和 ts 的工程，所以你可以基于它去改造你的现有项目

### Modifier.Form

简化 AntForm 的使用：你不需要写`Form.create` 和 `getFieldDecorator`了！同时提供 Modifier 的表单提交功能

如下示例：

```
import * as React from 'react'
import * as Modifier from 'Modifier'
import { Input, Button } from 'antd'

function submit(formData, customData) {
  console.log(formData, customData)
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

function onSubmit() {
  Modifier.Form.submit('modifierForm', 'customData')
}

function App() {
  return (
    <Modifier.Form name="modifierForm" action={submit}>
      <Modifier.Item id="name" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" />
      </Modifier.Item>
      <Button onClick={onSubmit}>提交</Button>
    </Modifier.Form>
  )
}

```

#### Modifier.Form.props.[name](https://github.com/aweiu/ant-modifier/blob/master/src/Modifier/src/Container.tsx#L11)

可以理解为组件的 id，有了它你才可以方便地调用到组件实例的各种方法

- 必填
- 类型：string

#### Modifier.Form.props.[action](https://github.com/aweiu/ant-modifier/blob/master/src/Modifier/src/Container.tsx#L12)

拿到表单数据之后你要做什么？比如表单的数据提交过程应当交给它

- 必填
- 类型：(formData: 表单数据, customData?: 自定义数据) => any

#### Modifier.Form.props.[...AntFormCreateOption](<https://ant.design/components/form-cn/#Form.create(options)>)

如果你需要用到 `Form.create` 的某些特性，直接：

```
 <Modifier.Form mapPropsToFields={ mapPropsToFields } onFieldsChange={ onFieldsChange } />
```

等同于：

```
Form.create({ mapPropsToFields, onFieldsChange })
```

#### Modifier.Form.props.[...AntFormProps](https://ant.design/components/form-cn/#Form)

组件代理了 AntForm 的所有 props，可参考上面链接

#### Modifier.Form.[submit](https://github.com/aweiu/ant-modifier/blob/master/src/Modifier/src/Form.tsx#L12)

组件的静态方法，调用它会执行数据提交前的一些准备工作，如表单校验。校验通过后会执行 [action](#modifierformpropsaction)

- 类型：(name: 你定义的 [name](#modifierformpropsname), customData?: 会回调给 [action](#modifierformpropsaction) 的自定义数据) => Promise

### Modifier.Modal

如果你业务中表单的修改和创建是在弹窗中完成的，那就来用它吧！除了提供简化 AntForm 的功能外，还为你自动管理了 Modal 的状态

如下示例：

```
import * as React from 'react'
import * as Modifier from 'Modifier'
import { Input, Button } from 'antd'

function submit(formData, customData) {
  console.log(formData, customData)
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

function onSubmit() {
  Modifier.Modal.show('modifierModal', 'customData')
}

function App() {
  return (
    <div>
      <Modifier.Modal name="modifierModal" action={submit} title="创建用户">
        <Form>
          <Modifier.Item id="name" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" />
          </Modifier.Item>
        </Form>
      </Modifier.Modal>
      <Button onClick={onSubmit}>创建用户</Button>
    </div>
  )
}
```

可以看到你唯一需要做的就是在需要它出现的时候去调用 `Modifier.Modal.show`

#### Modifier.Modal.props.name

同 [Form.props.name](#modifierformpropsname)

#### Modifier.Modal.props.action

同 [Form.props.action](#modifierformpropsaction)

#### Modifier.Modal.props.[...AntFormCreateOption](<https://ant.design/components/form-cn/#Form.create(options)>)

同 [Form.props.AntFormCreateOption](#modifierformpropsantformcreateoption)

#### Modifier.Modal.props.[...AntModalProps](https://ant.design/components/modal-cn/#API)

- `visible`
- `confirmLoading`
- `onOk`
- `onCancel`

除了以上属性被「征用」了，组件代理了 AntModal 的所有 props，可参考上面链接

#### Modifier.Modal.[show](https://github.com/aweiu/ant-modifier/blob/master/src/Modifier/src/Modal.tsx#L26)

组件的静态方法，调用它会使你的弹窗表单变成可见状态，之后的行为同 [Form.submit](#modifierformsubmit) 一致；关闭和 loading 状态由它自己维护

### Modifier.Item

功能类似于 [AntFormItem](https://ant.design/components/form-cn/#Form.Item)

#### Modifier.Item.props.id

`getFieldDecorator` 的 `id` 参数

- 必填
- 类型：string

#### Modifier.Item.props.[...GetFieldDecoratorOptions](<https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0>)

`getFieldDecorator` 的 `options` 参数

```
<Modifier.Item id="name" rules={ [ { required: true } ] } initialValue="Jack" >
  <Input />
</Modifier.Item>
```

等同于：

```
<Form.Item>
  {
    getFieldDecorator('name', { rules: [ { required: true } ], initialValue: 'Jack' })(<Input />)
  }
</Form.Item>
```

### getForm

`Modifier`、[Modal]()、[Form]() 共享的静态方法，用于获取某个 `Modifier 实例` 的 [props.form](<https://ant.design/components/form-cn/#Form.create(options)>)

- 类型：(name: 组件中定义的 `name`) => [WrappedFormUtils](https://github.com/ant-design/ant-design/blob/master/components/form/Form.tsx#L138) | undefined

```
import * as Modifier from 'Modifier'

const form = Modifier.getForm('userCreator')
// const form = Modifier.Modal.getForm('userCreator')
// const form = Modifier.Form.getForm('userCreator')
if (form) {
  console.log(form.getFieldsValue()) // https://github.com/ant-design/ant-design/blob/master/components/form/Form.tsx#L140
}
```

## 相关文章

- [AntModifier 设计和实现的心路历程](https://zhuanlan.zhihu.com/p/64983378)
- [前端怎么深入思考？](https://www.zhihu.com/question/322385547/answer/668758964)
