import { connect } from 'react-redux'
import ModalPicture from './ModalPicture'
import { closePicture } from '../../actions'

function mapStateToProps (state) {
  return {
    isOpen: state.modalPictureReducer.isOpen,
    picture: state.modalPictureReducer.picture
  }
}

const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(closePicture())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPicture)
