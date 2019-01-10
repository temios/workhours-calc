import { connect } from 'react-redux'
import { addPartToReport, editPart, reloadParts } from '../../actions'
import ChoiceGrid from './ChoiceGrid'

const mapDispatchToProps = (dispatch) => ({
  addPartToReport: (properties) => {
    dispatch(addPartToReport(properties))
  },
  reloadParts: (properties) => {
    dispatch(reloadParts(properties))
  },
  editPart: (properties) => {
    dispatch(editPart(properties))
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    parts: state.catalogReducer.currentParts,
    reportItems: state.reportReducer.items
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceGrid)
