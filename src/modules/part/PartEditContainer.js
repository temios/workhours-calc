import { connect } from 'react-redux'
import PartForm from './PartForm'
import { updatePart } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    dispatch(updatePart(properties))
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    part: state.catalogReducer.editPart,
    isEdit: true
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartForm)
