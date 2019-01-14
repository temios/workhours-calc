import { connect } from 'react-redux'
import PartForm from './PartForm'
import { reloadParts, showAlert } from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    api.editPart(properties).then(
      response => {
        api.getParts(response.id_category).then(parts => {
          dispatch(reloadParts(response.id_category, parts))
        })
      },
      err => dispatch(showAlert({
        text: err.message,
        color: 'danger'
      }))
    )
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
