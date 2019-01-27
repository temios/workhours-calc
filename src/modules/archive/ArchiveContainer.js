import { connect } from 'react-redux'
import ArchiveContent from './ArchiveContent'
import {
  addReportToArchive,
  loadReportFromArchive,
  showPicture
} from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addReportToArchive: (props) => {
    dispatch(addReportToArchive(props))
  },
  loadReportFromArchive: (props) => {
    api.getReportParts(props).then(items => {
      dispatch(loadReportFromArchive(props, items))
    })
  },
  showPicture: properties => {
    dispatch(showPicture(properties))
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
