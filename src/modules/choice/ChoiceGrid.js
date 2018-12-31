import React from 'react'
import {
  Button,
  Col, FormFeedback,
  Input,
  Label,
  Modal, ModalBody, ModalFooter,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap'
import './ChoiseGrid.css'

class ChoiceGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      modal: false,
      partId: null,
      count: null,
    }
    this.reloadParts = this.reloadParts.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.toggle = this.toggle.bind(this)
    this.addPart = this.addPart.bind(this)
    this.changeCount = this.changeCount.bind(this)
  }

  reloadParts (event) {
    this.props.reloadParts(event.target.value)
  }

  handleAdd (event) {
    this.setState({
      partId: parseInt(event.target.dataset.id),
    })
    this.toggle()
  }

  addPart () {
    let part = this.props.parts.filter((part) => {
      return part.id === this.state.partId
    })[0]
    this.props.addPartToReport({
      count: this.state.count,
      part: part,
    })
    this.toggle()
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
      modal: !this.state.modal,
    })
  }

  render () {
    let categories = ''
    let parts
    if (this.props.categories) {
      categories = <Row>
        <Label for='category' sm={2}>Категория:</Label>
        <Col sm={10}>
          <Input type='select' name='category' id='category'
                 onChange={this.reloadParts}>
            {this.props.categories.map((category) =>
              <option key={category.id}
                      value={category.name}>{category.name}
              </option>)}
          </Input>
        </Col>
      </Row>
    }
    if (this.props.parts.length > 0) {
      parts = this.props.parts.map((part) =>
        <tr key={part.id}>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>
            <img src='/WorkHours.png' className='partImage' alt=''/>
          </td>
          <td>@mdo</td>
          <td><Button color='warning'>Редактировать</Button></td>
          <td><Button color='success' data-id={part.id}
                      onClick={this.handleAdd}>Добавить</Button></td>
        </tr>,
      )
    } else {
      parts = <tr>
        <td>Нет деталей в выбранной категории</td>
      </tr>
    }
    return (
      <React.Fragment>
        {categories}
        <Table>
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
          <tbody>
          {parts}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
               className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Количество</ModalHeader>
          <ModalBody>
            <Input type='text' onChange={this.changeCount}
                   invalid={this.state.error !== ''}/>
            <FormFeedback>{this.state.error}</FormFeedback>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>Отмена</Button>
            <Button color='success' onClick={this.addPart}
                    disabled={this.state.error !== ''}>Добавить</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ChoiceGrid