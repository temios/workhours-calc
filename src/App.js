import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PageContainer from './PageContainer'
import ReportContainer from './modules/report/ReportContainer'
import PartContent from './modules/part/PartContent'
import ChoiceContent from './modules/choice/ChoiseContent'
import ArchiveContainer from './modules/archive/ArchiveContainer'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadCategories, reloadParts } from './actions'
import PartEdit from './modules/part/PartEdit'
import api from './services/ipc'

const store = createStore(rootReducer)

// window.fetch('/mock.json').then((response) => {
//   return response.json()
// }).then((data) => {
//   store.dispatch(initialStore(data))
// })

api.getCategories().then((data) => {
  store.dispatch(loadCategories(data))
  return data
}).then(categories => {
  if (categories !== undefined && categories.length > 0) {
    let currentCat = categories[0]
    api.getParts(currentCat.id).then((parts) => {
      console.log(parts)
      store.dispatch(reloadParts(currentCat.name, parts))
    })
  }
})

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <PageContainer>
            <Switch>
              <Route exact path='/' component={ReportContainer} />
              <Route path='/report' component={ReportContainer} />
              <Route path='/choice' component={ChoiceContent} />
              <Route path='/part' component={PartContent} />
              <Route path='/edit' component={PartEdit} />
              <Route path='/archive' component={ArchiveContainer} />
            </Switch>
          </PageContainer>
        </Router>
      </Provider>
    )
  }
}

export default App
