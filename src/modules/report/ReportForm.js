import * as React from 'react'
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  FormGroup,
  InputGroup,
  Label
} from 'reactstrap'
import './ReportForm.css'

class ReportForm extends React.Component {
  constructor (props) {
    super(props)
    this.removePart = this.removePart.bind(this)
    this.clearReport = this.clearReport.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
    this.changeName = this.changeName.bind(this)
    this.addToArchive = this.addToArchive.bind(this)
  }

  removePart (e) {
    let partId = parseInt(e.target.dataset.id)
    this.props.removePart(partId)
  }

  clearReport () {
    this.props.clearReport()
  }

  decrementCount (e) {
    let partId = parseInt(e.target.dataset.id)
    this.props.decrementPartCount(partId)
  }

  incrementCount (e) {
    let partId = parseInt(e.target.dataset.id)
    this.props.incrementPartCount(partId)
  }

  changeName (e) {
    this.props.changeReportName(e.target.value)
  }

  addToArchive () {
    this.props.addReportToArchive({
      items: this.props.items,
      name: this.props.reportName
    })
    this.props.clearReport()
  }

  render () {
    let content = 'Для добаление деталей перейдите к выбору.'
    let buttons = ''
    let reportName = ''
    console.log(this.props.items)
    if (this.props.items && this.props.items.length > 0) {
      content =
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Количество</th>
              <th>Ч/Часы</th>
              <th>Картинка</th>
              <th>Название</th>
              <th>Сумма</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item) => {
              return (
                <tr key={item.part.id}>
                  <td>{item.part.id}</td>
                  <td>
                    <button disabled={item.count < 2} data-id={item.part.id}
                      onClick={this.decrementCount}>-
                    </button>
                    {item.count}
                    <button onClick={this.incrementCount}
                      data-id={item.part.id}>+
                    </button>
                  </td>
                  <td>{item.part.hours}</td>
                  <td><img src={item.part.picture} alt={''}
                    className={'part-picture'} /></td>
                  <td>{item.part.name}</td>
                  <td>{item.count * item.part.hours}</td>
                  <td><Button color={'danger'} data-id={item.part.id}
                    onClick={this.removePart}>Удалить</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      buttons = <Row>
        <Col md={2}>
          <Button color={'success'} disabled={this.props.reportName === ''}>
            Сохранить как
          </Button>
        </Col>
        <Col md={{ size: 2, offset: 8 }}>
          <Button color={'success'} disabled={this.props.reportName === ''}
            onClick={this.addToArchive}>
            Добавить в архив
          </Button>
        </Col>
      </Row>
      reportName =
        <FormGroup row>
          <Label for='name' md={2}>Название отчёта:</Label>
          <Col md={10}>
            <InputGroup>
              <Input type='text' name='name' id='name'
                value={this.props.reportName} onChange={this.changeName}
                invalid={this.props.reportName === ''} />
            </InputGroup>
          </Col>
        </FormGroup>
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            <h1>Отчёт</h1>
          </Col>
          <Col md={{ size: 1, offset: 5 }}>
            <Button color={'warning'}
              onClick={this.clearReport}>Очистить</Button>
          </Col>
        </Row>
        {reportName}
        {content}
        {buttons}
      </React.Fragment>
    )
  }
}

export default ReportForm
