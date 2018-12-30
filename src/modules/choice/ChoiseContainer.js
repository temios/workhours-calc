import * as React from 'react'

class ChoiceContainer extends React.Component {
  constructor (props, context) {
    super(props)
    let parts = []
    fetch('/mock.json').then((response) => {
      return response.json()
    }).then((data) => {
      parts = data
      console.log(parts)
    })
  }

  render () {
    return (
      <div>
        choise
      </div>
    )
  }
}

export default ChoiceContainer