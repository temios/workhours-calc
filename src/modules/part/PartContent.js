import * as React from 'react'
import Header from '../../shared/components/Header'
import PartAddContainer from './PartAddContainer'

class PartContent extends React.Component {
  render () {
    return (
      <div>
        <Header header='Новая сборка' />
        <PartAddContainer />
      </div>
    )
  }
}

export default PartContent
