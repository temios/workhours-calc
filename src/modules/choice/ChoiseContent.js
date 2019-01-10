import * as React from 'react'
import Header from '../../shared/components/Header'
import ChoiceContainer from './ChoiseContainer'

class ChoiceContent extends React.Component {
  render () {
    return (
      <div>
        <Header header='Выбор деталей' />
        <ChoiceContainer />
      </div>
    )
  }
}

export default ChoiceContent
