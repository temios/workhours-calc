import { connect } from 'react-redux'
import CustomAlert from './CustomAlert'
import { closeAlert } from '../../actions'

function mapStateToProps (state) {
  return {
    isOpen: state.alertReducer.isOpen,
    text: state.alertReducer.text,
    color: state.alertReducer.color
  }
}

const mapDispatchToProps = dispatch => ({
  closeAlert: () => {
    dispatch(closeAlert())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAlert)