import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Guides from '../components/guides';
import Navbar from '../components/navbar';

const App = ({ match: { params } }) => {
  const style = {
    paddingTop: '10px'
  }
  return (
    <div>
      <Navbar guidePath={params.guidePath || '/'} />
      <div className="container" style={style}>
        <Guides guidePath={params.guidePath || '/'} />
      </div>
    </div>
  )
}

export default App;