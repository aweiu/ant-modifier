import { Modal } from 'antd'
import ModalLike from './ModalLike'
import { ModalProps } from 'antd/es/modal'

export default class ModifierModal<
  FormData = any,
  CustomData = any
> extends ModalLike<FormData, CustomData, ModalProps> {
  Container = Modal
}
