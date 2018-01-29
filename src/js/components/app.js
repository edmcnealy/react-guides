import React from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './header/navbar';
import Main from './main';

const App = () => (
  <div>
    <Navbar />
    <Main />
  </div>
);

export default App;