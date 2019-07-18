import * as React from 'react'
import { Button, Popover } from 'antd'
import { PopoverProps } from 'antd/es/popover'
import { excludeProps } from './utils'
import createModalLike, { ModifierModalLikeProps } from './createModalLike'

interface ModifierAntPopoverState {
  visible?: boolean
}

class ModifierAntPopover extends React.PureComponent<
  ModifierModalLikeProps & PopoverProps,
  ModifierAntPopoverState
> {
  state = {
    visible: this.props.visible,
  }

  adjusted = false

  adjustPosition = () => {
    // 防止浮层错位并保持动画效果
    setTimeout(() => {
      this.forceUpdate() // 强制纠错位置，会导致动画效果消失
      this.setState({ visible: false }, () => this.setState({ visible: true }))
    }, 0)
  }

  componentWillReceiveProps({
    visible,
  }: Readonly<ModifierModalLikeProps & PopoverProps>) {
    if (visible !== this.props.visible) {
      this.setState({ visible })
      if (visible && !this.adjusted) {
        this.adjustPosition()
        this.adjusted = true
      }
    }
  }

  render() {
    const { visible } = this.state
    const { confirmLoading, onOk, onCancel } = this.props

    return (
      <Popover
        {...excludeProps(['confirmLoading', 'onOk', 'onCancel'], this.props)}
        visible={visible}
      >
        {this.props.children}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <Button size="small" onClick={onCancel}>
            取消
          </Button>
          <Button
            loading={confirmLoading}
            className="primary-color mg-l"
            size="small"
            onClick={onOk}
          >
            确定
          </Button>
        </div>
      </Popover>
    )
  }
}

export default createModalLike(ModifierAntPopover)
