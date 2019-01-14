import { Alert, Row, Col } from 'reactstrap'
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
      <Row>
        <Col md={12}>
          <div className={'custom-alert-container'}>
            <Alert
              color={this.props.color}
              isOpen={this.props.isOpen}
              className={'custom-alert'}
            >
              {this.props.text}
            </Alert>
          </div>
        </Col>
      </Row>
    )
  }
}
