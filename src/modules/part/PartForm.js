import * as React from 'react'
import {
  Button,
  Col, DropdownItem,
  DropdownMenu, DropdownToggle,
  Form,
  FormGroup,
  Input, InputGroup, InputGroupButtonDropdown,
  Label, Row
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import './PartForm.css'

class PartForm extends React.Component {
  constructor (props) {
    super(props)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.validateField = this.validateField.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)

    this.state = {
      dropdownOpen: false,
      part: this.props.part,
      inputErrors: { category: '', name: '', hour: '', picture: '' },
      inputValids: {
        category: this.props.isEdit,
        name: this.props.isEdit,
        hour: this.props.isEdit,
        picture: this.props.isEdit
      },
      inputTouched: {
        category: false,
        name: false,
        hour: false,
        picture: false
      },
      formValid: this.props.isEdit,
      redirect: Object.keys(this.props.part).length === 0,
      previewURL: this.props.isEdit ? this.props.part.picture : '',
      isEdit: this.props.isEdit
    }
  }

  toggleDropDown () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  handleUserInput (e) {
    const name = e.target.name
    const value = e.target.value
    let state = this.state
    state.part[name] = value
    if (name === 'picture') {
      state.part[name] = e.target.files[0].path
      state.previewURL = URL.createObjectURL(e.target.files[0])
    }
    this.setState({
      state: state
    },
    () => { this.validateField(name, value) })
  }

  validateField (fieldName, value) {
    let inputErrors = this.state.inputErrors
    let inputValids = this.state.inputValids
    let inputTouched = this.state.inputTouched

    inputValids[fieldName] = value.length > 0
    inputErrors[fieldName] = value.length > 0 ? '' : 'Обязательное поле'
    inputTouched[fieldName] = true
    this.setState({
      inputValids: inputValids,
      inputErrors: inputErrors,
      inputTouched: inputTouched
    }, this.validateForm)
  }

  chooseCategory (event) {
    let state = this.state
    state.part.category = event.target.innerHTML
    this.setState({
      state: state
    }, () => { this.validateField('category', state.part.category) })
  }

  validateForm () {
    let valid = true
    for (let value in this.state.inputValids) {
      valid = valid && this.state.inputValids[value] === true
    }
    this.setState({ formValid: valid })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.addPart(this.state.part)
    this.setState({ redirect: true })
  }

  render () {
    let categories = ''
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/choice' push /> // TODO: redux browser history?
    }
    if (this.props.categories) {
      categories = <InputGroupButtonDropdown addonType='append'
        isOpen={this.state.dropdownOpen}
        toggle={this.toggleDropDown}>
        <DropdownToggle caret />
        <DropdownMenu>
          {this.props.categories.map((category) => {
            return <DropdownItem key={category.id}
              onClick={this.chooseCategory}>{category.name}</DropdownItem>
          })}
        </DropdownMenu>
      </InputGroupButtonDropdown>
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for='category' md={2}>Категория</Label>
          <Col md={10}>
            <InputGroup>
              <Input type='text' name='category'
                id='category' // TODO вынести в компонент
                value={this.state.part.category}
                invalid={!this.state.inputValids.category &&
                     this.state.inputTouched.category}
                onChange={this.handleUserInput} />
              {this.props.categories && categories}
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='partName' md={2}>Наименование</Label>
          <Col md={10}>
            <Input type='text' name='name' id='name'
              defaultValue={this.state.part.name}
              invalid={!this.state.inputValids.name &&
                   this.state.inputTouched.name}
              onChange={this.handleUserInput} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='hour' md={2}>Кол-во часов</Label>
          <Col md={10}>
            <Input type='text' name='hour' id='hour'
              defaultValue={this.state.part.hour}
              invalid={!this.state.inputValids.hour &&
                   this.state.inputTouched.hour}
              onChange={this.handleUserInput} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='picture' md={2}>Картинка</Label>
          <Col md={10}>
            <Input type='file' name='picture' id='picture'
              accept='.png,.jpeg,.jpg'
              invalid={!this.state.inputValids.picture &&
                   this.state.inputTouched.picture}
              onChange={this.handleUserInput} />
          </Col>
        </FormGroup>
        <Row>
          <Col md={10}>
            <img src={this.state.previewURL} id={'part-picture'} alt='' />
          </Col>
        </Row>
        <Button color='success'
          disabled={!this.state.formValid}>{this.props.isEdit
            ? 'Сохранить'
            : 'Добавить'}</Button>
      </Form>
    )
  }
}

export default PartForm
