import { connect } from 'react-redux'
import ArchiveContent from './ArchiveContent'
import { addReportToArchive, loadReportFromArchive } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  addReportToArchive: (props) => {
    dispatch(addReportToArchive(props))
  },
  loadReportFromArchive: (props) => {
    dispatch(loadReportFromArchive(props))
  }
})

function mapStateToProps (state) {
  return {
    reports: state.archiveReducer.reports
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveContent)
