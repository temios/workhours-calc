import * as React from 'react'
import {
  Button,
  Col, DropdownItem,
  DropdownMenu, DropdownToggle,
  Form,
  FormGroup,
  Input, InputGroup, InputGroupButtonDropdown,
  Label, Row,
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

    this.state = {
      dropdownOpen: false,
      part: {
        category: '',
        name: '',
        hours: '',
        picture: '',
        id: 0,
      },
      inputErrors: { category: '', name: '', hours: '', picture: '' },
      inputValids: {
        category: false,
        name: false,
        hours: false,
        picture: false,
      },
      inputTouched: {
        category: false,
        name: false,
        hours: false,
        picture: false,
      },
      formValid: false,
      redirect: false,
      previewURL: '',
    }
  }

  toggleDropDown () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  handleUserInput (e) {
    const name = e.target.name
    const value = e.target.value
    let state = this.state
    state.part[name] = value
    if (name === 'picture') {
      state.previewURL = URL.createObjectURL(e.target.files[0])
    }
    this.setState({
        state: state,
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
      inputTouched: inputTouched,
    }, this.validateForm)
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
    console.log(this.context)
    this.setState({ redirect: true })
  }

  render () {
    let categories = ''
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/choice' push={true}/> //TODO: redux browser history?
    }
    if (this.props.categories) {
      categories = <InputGroupButtonDropdown addonType="append"
                                             isOpen={this.state.dropdownOpen}
                                             toggle={this.toggleDropDown}>
        <DropdownToggle caret>
        </DropdownToggle>
        <DropdownMenu>
          {this.props.categories.map(function (category) {
            return <DropdownItem>{category.name}</DropdownItem>
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
                     id='category' //TODO вынести в компонент
                     defaultValue={this.state.category}
                     invalid={!this.state.inputValids.category &&
                     this.state.inputTouched.category}
                     onChange={this.handleUserInput}/>
              {this.props.categories && categories}
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='partName' md={2}>Наименование</Label>
          <Col md={10}>
            <Input type='text' name='name' id='name'
                   defaultValue={this.state.name}
                   invalid={!this.state.inputValids.name &&
                   this.state.inputTouched.name}
                   onChange={this.handleUserInput}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='hours' md={2}>Кол-во часов</Label>
          <Col md={10}>
            <Input type='text' name='hours' id='hours'
                   defaultValue={this.state.hours}
                   invalid={!this.state.inputValids.hours &&
                   this.state.inputTouched.hours}
                   onChange={this.handleUserInput}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='picture' md={2}>Картинка</Label>
          <Col md={10}>
            <Input type='file' name='picture' id='picture'
                   accept=".png,.jpeg,.jpg"
                   defaultValue={this.state.picture}
                   invalid={!this.state.inputValids.picture &&
                   this.state.inputTouched.picture}
                   onChange={this.handleUserInput}/>
          </Col>
        </FormGroup>
        <Row>
          <Col md={10}>
            <img src={this.state.previewURL} id={'part-picture'} alt=''/>
          </Col>
        </Row>
        <Button color='success'
                disabled={!this.state.formValid}>Добавить</Button>
      </Form>
    )
  }
}

export default PartForm