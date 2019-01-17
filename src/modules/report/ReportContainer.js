import { connect } from 'react-redux'
import {
  clearReport,
  removePartFromReport,
  addReportToArchive,
  incrementPartCount,
  decrementPartCount,
  changeReportName,
  allowRewriteDialog,
  showAlert,
  showPicture
} from '../../actions'
import ReportForm from './ReportForm'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  clearReport: (props) => {
    dispatch(clearReport(props))
  },
  removePart: (props) => {
    dispatch(removePartFromReport(props))
  },
  addReportToArchive: (props, allowRewrite) => {
    api.checkReportName(props.name).then(result => {
      if (!result || allowRewrite) {
        api.saveReport(props).then(report => {
          dispatch(addReportToArchive(report))
          dispatch(allowRewriteDialog(false))
          dispatch(
            showAlert({ text: 'Отчет добавлен в архив.', color: 'success' })
          )
        })
      } else {
        dispatch(allowRewriteDialog(true))
      }
    })
  },
  closeRewriteDialog: () => {
    dispatch(allowRewriteDialog(false))
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
  savePdf: (props) => {
    api.savePdf(props).then(() => {
      dispatch(
        showAlert({ text: 'Отчет сохранен в pdf.', color: 'success' })
      )
    })
  },
  showPicture: properties => {
    dispatch(showPicture(properties))
  }
})

function mapStateToProps (state) {
  return {
    items: state.reportReducer.items,
    reportName: state.reportReducer.reportName,
    rewriteDialog: state.reportReducer.allowRewriteDialog,
    sum: state.reportReducer.sum
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportForm)
