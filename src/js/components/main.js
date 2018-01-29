import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Guides from './guides/guides';

const Main = () => (
  <main className="container">
    <Switch>
      <Route path='/:guidePath*' component={Guides}/>
    </Switch>
  </main>
)

export default Main;