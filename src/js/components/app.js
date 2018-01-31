import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import GuidesCollection from './guidesCollection';

const style = {
  paddingTop: '10px'
}
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container" style={style}>
        <Route exact path="/:guidePath*" component={GuidesCollection} />
      </div>
    </div>
  )
}

export default App;