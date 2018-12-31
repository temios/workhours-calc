import * as React from 'react'
import Header from '../../shared/components/Header'
import PartFormContainer from './PartFormContainer'

class PartContent extends React.Component {
  render () {
    return (
      <div>
        <Header header='Новая деталь'/>
        <PartFormContainer/>
      </div>
    )
  }
}

export default PartContent;