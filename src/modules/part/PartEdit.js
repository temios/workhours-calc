import * as React from 'react'
import Header from '../../shared/components/Header'
import PartEditContainer from './PartEditContainer'

class PartEdit extends React.Component {
  render () {
    return (
      <div>
        <Header header='Редактирование сборки' />
        <PartEditContainer />
      </div>
    )
  }
}

export default PartEdit
