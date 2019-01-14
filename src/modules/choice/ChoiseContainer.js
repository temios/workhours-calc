import { connect } from 'react-redux'
import { addPartToReport, editPart, reloadParts, showAlert } from '../../actions'
import ChoiceGrid from './ChoiceGrid'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addPartToReport: (properties) => {
    dispatch(
      showAlert({ text: 'Сборка добавлена в отчёт.', color: 'success' })
    )
    dispatch(addPartToReport(properties))
  },
  reloadParts: (id) => {
    api.getParts(id).then(parts => {
      dispatch(reloadParts(id, parts))
    })
  },
  editPart: (properties) => {
    dispatch(editPart(properties))
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    parts: state.catalogReducer.currentParts,
    reportItems: state.reportReducer.items,
    currentCategory: state.catalogReducer.currentCategory
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceGrid)
