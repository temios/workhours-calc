import { connect } from 'react-redux'
import PartForm from './PartForm'
import { redirectFromPart, reloadParts, showAlert } from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = dispatch => ({
  addPart: properties => {
    api.editPart(properties).then(response => {
      dispatch(
        showAlert({ text: 'Сборка успешно сохранена.', color: 'success' })
      )
      api.getParts(response.id_category).then(parts => {
        dispatch(reloadParts(response.id_category, parts))
      })
      dispatch(redirectFromPart(true))
      setTimeout(() => dispatch(redirectFromPart(false)), 500)
    })
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    part: state.catalogReducer.editPart,
    isEdit: true,
    redirect: state.partReducer.redirect
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartForm)
