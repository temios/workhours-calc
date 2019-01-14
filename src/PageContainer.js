import * as React from 'react'
import MenuContainer from './modules/menu/MenuContainer'
import { Col, Container, Row } from 'reactstrap'
import CustomAlertContainer from './shared/components/CustomAlertContainer'

class PageContainer extends React.Component {
  render () {
    return (
      <div>
        <MenuContainer />
        <Container>
          <CustomAlertContainer />
          <Row className='pt-5'>
            <Col md='12'>{this.props.children}</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default PageContainer
