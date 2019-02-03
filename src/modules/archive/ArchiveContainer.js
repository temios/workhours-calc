import { connect } from 'react-redux'
import ArchiveContent from './ArchiveContent'
import {
  addReportToArchive,
  loadReportFromArchive,
  showPicture
} from '../../actions'
import api from '../../services/ipc'
import pictureService from '../../services/pictureService'

const mapDispatchToProps = (dispatch) => ({
  addReportToArchive: (props) => {
    dispatch(addReportToArchive(props))
  },
  loadReportFromArchive: (props) => {
    api.getReportParts(props).then(items => {
      pictureService.resetDraftUrl()
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
