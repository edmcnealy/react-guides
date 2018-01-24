import React from 'react';
import Navbar from './header/navbar';
import DocContainer from './docContainer';
import List from './list';
import Form from './form';

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col s4">
          <h2>Docs</h2>
          <DocContainer />
        </div>
        <div className="col s4">
          <h2>Articles</h2>
          <List />
        </div>
        <div className="col s64">
          <h2>Add a new article</h2>
          <Form />
        </div>
      </div>
    </div>
  </div>
);

export default App;