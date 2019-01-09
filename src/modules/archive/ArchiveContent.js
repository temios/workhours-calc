import React from 'react'
import Header from '../../shared/components/Header'
import { Button, Table } from 'reactstrap'

class ArchiveContent extends React.Component {
  constructor (props) {
    super(props)
    this.loadReport = this.loadReport.bind(this)
  }

  loadReport (e) {
    let reportId = parseInt(e.target.dataset.id)
    let report = this.props.reports.filter((report) => {
      return report.id === reportId
    })[0]
    this.props.loadReportFromArchive(report)
  }

  render () {
    let reports = ''
    if (this.props.reports && this.props.reports.length > 0) {
      reports =
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Дата</th>
            <th>Редактирование</th>
          </tr>
          </thead>
          <tbody>
          {this.props.reports.map((report) => {
            return (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>Date</td>
                <td><Button color={'success'} data-id={report.id} onClick={this.loadReport}>Загрузить</Button></td>
              </tr>
            )
          })}
          </tbody>
        </Table>
    }
    return (
      <React.Fragment>
        <Header header={'Архив отчётов'}/>
        {reports}
      </React.Fragment>
    )
  }
}

export default ArchiveContent