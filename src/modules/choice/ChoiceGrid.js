import React from 'react'
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import pictureService from '../../services/pictureService'
import './ChoiseGrid.css'
import ModalPictureContainer from '../../shared/components/ModalPictureContainer'

class ChoiceGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      modal: false,
      partId: null,
      count: null,
      toEdit: false,
      modalError: false,
      modalErrorText: ''
    }
    this.reloadParts = this.reloadParts.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggleError = this.toggleError.bind(this)
    this.addPart = this.addPart.bind(this)
    this.changeCount = this.changeCount.bind(this)
    this.editPart = this.editPart.bind(this)
    this.showPicture = this.showPicture.bind(this)
  }

  reloadParts (event) {
    this.props.reloadParts(event.target.value)
  }

  handleAdd (event) {
    let partId = event.target.dataset.id
    this.setState({
      partId: parseInt(partId)
    })
    this.toggle()
  }

  addPart () {
    let alreadyAdded = this.props.reportItems.some(item => {
      return item.part.id === this.state.partId
    })
    if (alreadyAdded) {
      this.setState({
        modalErrorText: 'Эта деталь уже добавлена в отчёт'
      })
      this.toggleError()
    } else {
      let part = this.props.parts.filter(part => {
        return part.id === this.state.partId
      })[0]
      this.props.addPartToReport({
        count: this.state.count,
        part: part
      })
    }
    this.toggle()
  }

  editPart (event) {
    let partId = parseInt(event.target.dataset.id)
    let part = this.props.parts.filter(part => {
      return part.id === partId
    })[0]
    this.props.editPart(part)
    this.setState({ toEdit: true })
  }

  changeCount (event) {
    let count = parseInt(event.target.value)
    if (!isNaN(count)) {
      this.setState({
        count: count,
        error: ''
      })
    } else {
      this.setState({ error: 'Введите число.' })
    }
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleError () {
    this.setState({
      modalError: !this.state.modalError
    })
  }

  showPicture (e) {
    this.props.showPicture(e.target.src)
  }

  render () {
    let categories = ''
    let parts
    if (this.props.categories) {
      categories = (
        <Row className='category-selector'>
          <Label for='category' sm={2}>
            Категория:
          </Label>
          <Col sm={10}>
            <Input
              type='select'
              name='category'
              id='category'
              value={this.props.currentCategory}
              onChange={this.reloadParts}
            >
              {this.props.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      )
    }
    if (this.props.parts && this.props.parts.length > 0) {
      parts = this.props.parts.map(part => (
        <tr key={part.id}>
          <th scope='row'>{part.id}</th>
          <td>{part.hour}</td>
          <td>
            <img
              src={pictureService.getPath() + part.picture}
              className='catalog-part-picture'
              alt=''
              onClick={this.showPicture}
            />
          </td>
          <td>{part.name}</td>
          <td>
            <Button color='warning' onClick={this.editPart} data-id={part.id}>
              Редактировать
            </Button>
          </td>
          <td>
            <Button color='success' data-id={part.id} onClick={this.handleAdd}>
              Добавить
            </Button>
          </td>
        </tr>
      ))
    } else {
      parts = (
        <tr>
          <td>Нет деталей в выбранной категории</td>
        </tr>
      )
    }
    if (this.state.toEdit) {
      return <Redirect to='/edit' push />
    }
    return (
      <React.Fragment>
        {categories}
        <Table className='text-center table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Ч/Часы</th>
              <th>Картинка</th>
              <th>Название</th>
              <th>Редактирование</th>
              <th>Добавление</th>
            </tr>
          </thead>
          <tbody>{parts}</tbody>
        </Table>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className='choice-modal'
        >
          <ModalHeader>Количество</ModalHeader>
          <ModalBody>
            <Input
              type='text'
              onChange={this.changeCount}
              invalid={this.state.error !== ''}
            />
            <FormFeedback>{this.state.error}</FormFeedback>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>
              Отмена
            </Button>
            <Button
              color='success'
              onClick={this.addPart}
              disabled={this.state.error !== ''}
            >
              Добавить
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggleError}
          className='choice-modal'
        >
          <ModalHeader>Ошибка</ModalHeader>
          <ModalBody>{this.state.modalErrorText}</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.toggleError}>
              Ок
            </Button>
          </ModalFooter>
        </Modal>
        <ModalPictureContainer />
      </React.Fragment>
    )
  }
}

export default ChoiceGrid
