import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import './ModalPicture.css'

class ModalPicture extends React.Component {
  close = () => {
    this.props.close()
  }

  render () {
    return <div>
      <Modal isOpen={this.props.isOpen} toggle={this.close} size='lg'>
        <ModalBody><img src={this.props.picture} alt='' className='modal-image' /></ModalBody>
      </Modal>
    </div>
  }
}

export default ModalPicture
