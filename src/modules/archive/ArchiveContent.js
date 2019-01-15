import React from 'react'
import Header from '../../shared/components/Header'
import { Button, Table } from 'reactstrap'
import { Redirect } from 'react-router-dom'

class ArchiveContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.loadReport = this.loadReport.bind(this)
  }

  loadReport (e) {
    let reportId = parseInt(e.target.dataset.id)
    let report = this.props.reports.filter((report) => {
      return report.id === reportId
    })[0]
    this.props.loadReportFromArchive(report)
    this.setState({
      redirect: true
    })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/report' push />
    }
    let reports = ''
    if (this.props.reports && this.props.reports.length > 0) {
      reports =
        <Table className='text-center table-bordered'>
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
                  <td className='font-weight-bold'>{report.id}</td>
                  <td>{report.name}</td>
                  <td>{new Date(report.date_updated).toLocaleDateString()}</td>
                  <td><Button color={'success'} data-id={report.id} onClick={this.loadReport}>Загрузить</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
    }
    return (
      <React.Fragment>
        <Header header={'Архив отчётов'} />
        {reports}
      </React.Fragment>
    )
  }
}

export default ArchiveContent
