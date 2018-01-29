import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Guides extends Component {

  constructor() {
    super();
    this.state = {
      guidesData: [],
    };
  }

  componentDidMount() {
    let guidePath = window.location.hash.substr(1);
    this.getGuides(guidePath);
  }
  componentWillReceiveProps(nextProps) {
    let guidePath;
    if (nextProps.match && nextProps.match.params && nextProps.match.params.guidePath) {
      guidePath = nextProps.match.params.guidePath
    } else {
      guidePath = '';
    }
    this.getGuides(`/${guidePath}`);
  }

  getGuides(guidePath) {
    fetch(`http://localhost:3000/api/guides${guidePath}`).then((response) => {
      response.json().then((data) => {
        let guidesData = data.data;
        this.setState({ guidesData });
      });
    });
  }

  render() {
    const empty = (<h5>There's nothing here.</h5>);

    if (!this.state.guidesData) {
      return empty;
    }

    let dirs = this.buildLink(this.state.guidesData.dirs);
    let files = this.buildLink(this.state.guidesData.files);

    if (dirs === null && files === null) {
      return empty;
    }

    return (
      <div>
        {dirs}
        {files}
      </div>
    );
  }

  buildLink(items) {
    if (!items) {
      return null;
    }
    const link = items.map((item, i) => {
      return (
        <div key={item.text}>
          <span className="valign-wrapper waves-effect waves-teal btn-flat">
            <Link to={item.url}>
              <i className="material-icons small">insert_drive_file</i>
              <span>{item.text}</span>
            </Link>
          </span>
        </div>
      );
    });
    return link;
  }

}
