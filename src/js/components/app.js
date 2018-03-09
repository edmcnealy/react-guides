import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import GuidesCollection from './guidesCollection';
import AlertContainer from './alertContainer';
import MarkdownEdit from './markdownEdit';

const style = {
  paddingTop: '10px'
}
const App = () => {
  return (
    <div>
      <AlertContainer />
      <Navbar />
      <div className="container" style={style}>
        <Route path="/:guidePath*" exact render={({location}) => {
          return location.pathname.endsWith('.md/edit') ? <MarkdownEdit/> : <GuidesCollection/>;
        }} />
      </div>
    </div>
  )
}

export default App;