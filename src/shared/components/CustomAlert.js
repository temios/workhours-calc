import { Alert } from 'reactstrap'
import React from 'react'
import './CustomAlert.css'

export default class CustomAlert extends React.Component {
  componentWillUpdate (nextProps, nextState, nextContext) {
    setTimeout(() => {
      this.props.closeAlert()
    }, 2000)
  }

  render () {
    console.log(this.props)
    return (
      <Alert color={this.props.color} isOpen={this.props.isOpen}
             className={'custom-alert'}>{this.props.text}</Alert>
    )
  }
}