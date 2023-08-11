import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
import Section from './components/Section'
import {DataProvider} from './components/context'
import { Helmet } from 'react-helmet';
class App extends React.Component{
  render(){
    return(
      <DataProvider>
      <div className="app">
      <Helmet>
  <title>Shopping Cart-React Application</title>
</Helmet>
            <Router>
              <Header />
              <Section />
            </Router>
      </div>
      </DataProvider>
    )
  }
}

export default App;
