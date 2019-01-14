import { connect } from 'react-redux'
import PartForm from './PartForm'
import { reloadParts, showAlert } from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    api.savePart(properties).then(
      response => {
        dispatch(
          showAlert({ text: 'Сборка успешно сохранена.', color: 'success' })
        )
        api.getParts(response.id_category).then(parts => {
          dispatch(reloadParts(response.id_category, parts))
        })
      }
    )
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    part: {
      category: '',
      name: '',
      hour: '',
      picture: '',
      id: 0
    },
    isEdit: false
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartForm)
