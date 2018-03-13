import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { fetchGuidesIfNeeded } from '../actions/guidesActions';
import { alertError } from '../actions/alertActions';
import AddDir from './addDir';

class GuidesCollection extends Component {

  componentDidMount() {
    const { dispatch, selectedGuidePath } = this.props
    dispatch(fetchGuidesIfNeeded(selectedGuidePath))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, selectedGuidePath } = this.props

    if (selectedGuidePath !== prevProps.selectedGuidePath) {
      dispatch(fetchGuidesIfNeeded(selectedGuidePath))
    }

    if (this.props.error !== prevProps.error) {
      let error = this.props.error;
      if (error != null && error !== '') {
        dispatch(alertError(error));
      }
    }
  }

  render() {
    const { dirs, files, markdown, message, isFetching } = this.props;
    const isEmpty = dirs.length === 0 && files.length === 0 && (markdown == null || markdown === '');

    if (isFetching && isEmpty) {
      return (<h5>Loading...</h5>);
    }
    if (!isFetching && isEmpty) {
      return (<h5>{message ? message : 'Nothing here.'}</h5>);
    }

    if (markdown != null) {
      // This is a markdown file
      let editLink = `/${this.props.selectedGuidePath}/edit`;
      
      return (
        <div>
          <div className="right-align">
            <Link to={editLink} className="waves-effect waves-light btn">Edit</Link>
          </div>
          <div className="markdown-body">
            <ReactMarkdown source={markdown} />
          </div>
        </div>
      )
    }

    // This is a directory
    let dirsContainer = this.buildLink(dirs, true);
    let filesContainer = this.buildLink(files);

    return (
      <div>
        <div className="collection guides-collection">
          {dirsContainer}
          {filesContainer}
        </div>
        <div className="row">
          <AddDir />
        </div>
      </div>
    )
  }

  buildLink(items, isDir) {
    if (!items || items.length === 0) {
      return null;
    }
    const link = items.map((item, i) => {
      return (
        <Link to={item.url} className="collection-item" key={item.text}>
          <i className="material-icons left">{isDir ? 'folder' : 'insert_drive_file'}</i>{item.text}
        </Link>
      );
    });
    return link;
  }

  styleCodeBlock(props) {
    var html = Prism.highlight(props.literal, Prism.languages[props.language]);
    var cls = 'language-' + props.language;

    return (
      <pre className={cls}>
        <code
          dangerouslySetInnerHTML={{ __html: html }}
          className={cls}
        />
      </pre>
    )
  }

}

GuidesCollection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedGuidePath: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dirs: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  markdown: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { guidesByGuidePath } = state
  const { guidePath } = ownProps.match.params;
  const selectedGuidePath = guidePath || '';

  const {
    isFetching,
    lastUpdated,
    guideData,
    error
  } = guidesByGuidePath[selectedGuidePath] || {
    isFetching: true,
    guideData: {}
  };

  const dirs = guideData.dirs || [];
  const files = guideData.files || [];
  const markdown = guideData.markdown || null;
  const message = guideData.message || null;

  return {
    selectedGuidePath,
    isFetching,
    lastUpdated,
    dirs,
    files,
    markdown,
    message,
    error
  }
}

export default withRouter(connect(mapStateToProps)(GuidesCollection))