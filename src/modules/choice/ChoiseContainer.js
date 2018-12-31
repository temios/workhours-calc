import { connect } from 'react-redux'
import { addPartToReport, reloadParts } from '../../actions'
import ChoiceGrid from './ChoiceGrid'

const mapDispatchToProps = (dispatch) => ({
  addPartToReport: (properties) => {
    dispatch(addPartToReport(properties))
  },
  reloadParts: (properties) => {
    dispatch(reloadParts(properties))
  }
})

function mapStateToProps (state) {
  console.log(state);
  return {
    categories: state.catalogReducer.categories,
    parts: state.catalogReducer.currentParts,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceGrid)