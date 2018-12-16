import * as React from 'react'
import Header from '../../shared/components/Header'
import PartFormContainer from './PartFormContainer'

class PartAdd extends React.Component {
  render () {
    return (
      <div>
        <Header header='Добавление'/>
        <PartFormContainer/>
      </div>
    )
  }
}

export default PartAdd;