import React from 'react';
import List from './list';
import Form from './form';

const App = () => (
  <div className="row">
    <div className="col s6">
    <h2>Articles</h2>
      <List />
    </div>
    <div className="col s6">
      <h2>Add a new article</h2>
      <Form />
    </div>
  </div>
);

export default App;