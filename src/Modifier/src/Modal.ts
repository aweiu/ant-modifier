import { Modal } from 'antd'
import createModalLike from './createModalLike'
import { ModalProps } from 'antd/es/modal'

const ModifierModal = createModalLike<ModalProps>(Modal)
export default ModifierModal
