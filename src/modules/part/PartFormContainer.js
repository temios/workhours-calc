import { connect } from 'react-redux'
import PartForm from './PartForm'
import { addPart } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    dispatch(addPart(properties))
  }
})

export default connect(
  null,
  //mapStateToProps,
  mapDispatchToProps
)(PartForm)