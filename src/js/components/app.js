import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import GuidesCollection from './guidesCollection';
import AlertContainer from './alertContainer';

const style = {
  paddingTop: '10px'
}
const App = () => {
  return (
    <div>
      <AlertContainer />
      <Navbar />
      <div className="container" style={style}>
        <Route exact path="/:guidePath*" component={GuidesCollection} />
      </div>
    </div>
  )
}

export default App;