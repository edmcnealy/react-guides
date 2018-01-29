import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  selectGuidePath,
  fetchGuidesIfNeeded
} from '../actions';

class Guides extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, selectedGuidePath } = this.props
    dispatch(fetchGuidesIfNeeded(selectedGuidePath))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedGuidePath !== prevProps.selectedGuidePath) {
      const { dispatch, selectedGuidePath } = this.props
      dispatch(fetchGuidesIfNeeded(selectedGuidePath))
    }
  }

  render() {
    const { dirs, files } = this.props;
    let dirsContainer = this.buildLink(dirs);
    let filesContainer = this.buildLink(files);

    return (
      <div>
        {dirsContainer}
        {filesContainer}
      </div>
    )
  }

  buildLink(items) {
    if (!items) {
      return null;
    }
    const link = items.map((item, i) => {
      return (
        <div key={item.text} className="row">
          <Link to={item.url} className="valign-wrapper waves-effect waves-teal btn col s4">
            <i className="material-icons small">insert_drive_file</i>
            <span>{item.text}</span>
          </Link>
        </div>
      );
    });
    return link;
  }
}

Guides.propTypes = {
  selectedGuidePath: PropTypes.string.isRequired,
  dirs: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { guidesByGuidePath } = state
  const selectedGuidePath = ownProps.guidePath;

  const {
    isFetching,
    lastUpdated,
    dirs: dirs,
    files: files,
  } = guidesByGuidePath[selectedGuidePath] || {
      isFetching: true,
      dirs: [],
      files: [],
    }

  return {
    selectedGuidePath,
    isFetching,
    lastUpdated,
    dirs,
    files
  }
}

export default connect(mapStateToProps)(Guides)