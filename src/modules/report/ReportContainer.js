import { connect } from 'react-redux'
import {
  clearReport,
  removePartFromReport,
  addReportToArchive,
  incrementPartCount,
  decrementPartCount,
  changeReportName,
} from '../../actions'
import ReportForm from './ReportForm'

const mapDispatchToProps = (dispatch) => ({
  clearReport: (props) => {
    dispatch(clearReport(props))
  },
  removePart: (props) => {
    dispatch(removePartFromReport(props))
  },
  addReportToArchive: (props) => {
    dispatch(addReportToArchive(props))
  },
  incrementPartCount: (props) => {
    dispatch(incrementPartCount(props))
  },
  decrementPartCount: (props) => {
    dispatch(decrementPartCount(props))
  },
  changeReportName: (props) => {
    dispatch(changeReportName(props))
  },
})

function mapStateToProps (state) {
  return {
    items: state.reportReducer.items,
    reportName: state.reportReducer.reportName,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportForm)