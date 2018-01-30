import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
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
    const { dirs, files, markdown } = this.props;

    if (markdown != null) {
      // This is a markdown file
      return (
        <div className="markdown-body">
          <ReactMarkdown source={markdown} />
        </div>
      )
    }

    // This is a directory
    let dirsContainer = this.buildLink(dirs, true);
    let filesContainer = this.buildLink(files);

    if (dirsContainer === null && filesContainer === null) {
      return (
        <div><h5>Nothing here.</h5></div>
      );
    }

    return (
      <div className="collection guides-collection">
        {dirsContainer}
        {filesContainer}
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

Guides.propTypes = {
  selectedGuidePath: PropTypes.string.isRequired,
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
    markdown: markdown
  } = guidesByGuidePath[selectedGuidePath] || {
      isFetching: true,
      dirs: [],
      files: [],
      markdown: null
    }

  return {
    selectedGuidePath,
    isFetching,
    lastUpdated,
    dirs,
    files,
    markdown
  }
}

export default connect(mapStateToProps)(Guides)