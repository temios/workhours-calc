import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PageContainer from './PageContainer'
import ReportContainer from './modules/report/ReportContainer'
import PartAdd from './modules/part/PartAdd'
import ChoiceContainer from './modules/choice/ChoiseContainer'
import ArchiveContainer from './modules/archive/ArchiveContainer'
import { createStore } from 'redux'
import rootReducer from './reducers'
const store = createStore(rootReducer);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <PageContainer>
            <Switch>
              <Route exact path='/' component={ReportContainer}/>
              <Route path='/report' component={ReportContainer}/>
              <Route path='/choice' component={ChoiceContainer}/>
              <Route path='/part' component={PartAdd}/>
              <Route path='/archive' component={ArchiveContainer}/>
            </Switch>
          </PageContainer>
        </Router>
      </Provider>
    )
  }
}

export default App
