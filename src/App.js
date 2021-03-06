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
import PartEdit from './modules/part/PartEdit'
import { onLoad } from './onLoad'

const store = createStore(rootReducer)

onLoad(store)

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
