import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import configureStore from './configureStore';
import App from './components/app';

const store = configureStore();

render(
  <Provider store={store}>
    <HashRouter>
      <Route exact path="/:guidePath*" component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);