import React, { Component } from 'react';

export default class DocContainer extends Component {

  constructor() {
    super();
    this.state = {docs:[]};
  }

  componentDidMount() {
    this.getDocs();
  }

  getDocs() {
    fetch('http://localhost:3000/api/docs').then((data) => {
      data.json().then((docs) => {
        this.setState({ docs });
      });
    });
  }

  render() {
    const docs = this.state.docs.map((doc, i) => (
      <a key={doc.filename} className="valign-wrapper waves-effect waves-teal btn-flat" href="#">
        <i className="material-icons small">{doc.isDir ? "folder" : "insert_drive_file"}</i>
        <span>{doc.filename}</span>
      </a>
    ));

    return (
      <div>
        {docs}
      </div>
    );
  }

}
