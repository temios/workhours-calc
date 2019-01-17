import * as React from 'react'
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  FormGroup,
  InputGroup,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal
} from 'reactstrap'
import pictureService from '../../services/pictureService'
import './ReportForm.css'
import ModalPictureContainer from '../../shared/components/ModalPictureContainer'

class ReportForm extends React.Component {
  constructor (props) {
    super(props)
    this.removePart = this.removePart.bind(this)
    this.clearReport = this.clearReport.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
    this.changeName = this.changeName.bind(this)
    this.addToArchive = this.addToArchive.bind(this)
    this.allowRewrite = this.allowRewrite.bind(this)
    this.closeRewriteDialog = this.closeRewriteDialog.bind(this)
    this.savePdf = this.savePdf.bind(this)
    this.showPicture = this.showPicture.bind(this)
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

  allowRewrite () {
    this.props.addReportToArchive(
      {
        items: this.props.items,
        name: this.props.reportName
      },
      true
    )
  }

  addToArchive () {
    this.props.addReportToArchive(
      {
        items: this.props.items,
        name: this.props.reportName
      },
      false
    )
  }

  closeRewriteDialog () {
    this.props.closeRewriteDialog()
  }

  savePdf () {
    this.props.savePdf({
      items: this.props.items,
      name: this.props.reportName,
      sum: this.props.sum
    })
  }

  showPicture (e) {
    this.props.showPicture(e.target.src)
  }

  render () {
    let content = 'Для добаление деталей перейдите к выбору.'
    let buttons = ''
    let reportName = ''
    let sum = ''
    if (this.props.items && this.props.items.length > 0) {
      content = (
        <Table className='text-center table-bordered'>
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
            {this.props.items.map(item => {
              return (
                <tr key={item.part.id}>
                  <td className='font-weight-bold'>{item.part.id}</td>
                  <td>
                    <button
                      disabled={item.count < 2}
                      data-id={item.part.id}
                      onClick={this.decrementCount}
                      className='btn btn-default btn-number minus-button'
                    >
                      -
                    </button>
                    <span className='part-count'>{item.count}</span>
                    <button
                      onClick={this.incrementCount}
                      data-id={item.part.id}
                      className='btn btn-default btn-number plus-button'
                    >
                      +
                    </button>
                  </td>
                  <td>{item.part.hour}</td>
                  <td>
                    <img
                      src={pictureService.getPath() + item.part.picture}
                      alt={''}
                      className={'part-picture'}
                      onClick={this.showPicture}
                    />
                  </td>
                  <td>{item.part.name}</td>
                  <td>{item.count * item.part.hour}</td>
                  <td>
                    <Button
                      color={'danger'}
                      data-id={item.part.id}
                      onClick={this.removePart}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
      buttons = (
        <Row>
          <Col md={{ size: 2, offset: 8 }}>
            <Button
              color={'primary'}
              disabled={this.props.reportName === ''}
              onClick={this.savePdf}
            >
              Сохранить как
            </Button>
          </Col>
          <Col md={{ size: 2 }}>
            <Button
              color={'success'}
              disabled={this.props.reportName === ''}
              onClick={this.addToArchive}
            >
              Добавить в архив
            </Button>
          </Col>
        </Row>
      )
      reportName = (
        <FormGroup row>
          <Label for='name' md={2}>
            Название отчёта:
          </Label>
          <Col md={10}>
            <InputGroup>
              <Input
                type='text'
                name='name'
                id='name'
                value={this.props.reportName}
                onChange={this.changeName}
                invalid={this.props.reportName === ''}
              />
            </InputGroup>
          </Col>
        </FormGroup>
      )
      sum = (
        <Row>
          <Col md={{ size: 2, offset: 10 }} className='report-sum float-right'>
            Итого: {this.props.sum}
          </Col>
        </Row>
      )
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            <h1>Отчёт</h1>
          </Col>
          <Col md={{ size: 2, offset: 4 }}>
            <Button
              color={'warning'}
              onClick={this.clearReport}
              className='report-clear-button'
            >
              Очистить
            </Button>
          </Col>
        </Row>
        {reportName}
        {content}
        {sum}
        {buttons}
        <Modal
          isOpen={this.props.rewriteDialog}
          toggle={this.closeRewriteDialog}
        >
          <ModalHeader>Ошибка</ModalHeader>
          <ModalBody>Отчёт с таким именем уже есть, перезаписать?</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.closeRewriteDialog}>
              Отмена
            </Button>
            <Button color='success' onClick={this.allowRewrite}>
              Ок
            </Button>
          </ModalFooter>
        </Modal>
        <ModalPictureContainer />
      </React.Fragment>
    )
  }
}

export default ReportForm
