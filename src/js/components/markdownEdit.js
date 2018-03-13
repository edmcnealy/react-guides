import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { alertSuccess, alertWarn, alertError } from '../actions/alertActions';
import { fetchGuidesIfNeeded } from '../actions/guidesActions';
import { saveMarkdown } from '../actions/markdownEditActions';
import SubmitButton from './submitButton';

class MarkdownEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: props.markdown
    }
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedGuidePath } = this.props
    dispatch(fetchGuidesIfNeeded(selectedGuidePath))
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;

    if (this.props.markdown !== prevProps.markdown) {
      this.setState({ markdown: this.props.markdown });
    }

    if (this.props.error !== prevProps.error) {
      let error = this.props.error;
      if (error != null && error !== '') {
        dispatch(alertError(error));
      }
    }

    if (this.props.isSavingMarkdown !== prevProps.isSavingMarkdown && !this.props.isSavingMarkdown) {
      if (this.props.isSuccess && this.props.error === null) {
        dispatch(alertSuccess(`Saved!`));
      } else if (!this.props.isSuccess) {
        dispatch(alertWarn(`Could not save.`));
      }
    }
  }

  save() {
    this.props.dispatch(saveMarkdown(this.state.markdown, this.props.selectedGuidePath));
  }

  updateInputValue(evt) {
    this.setState({ markdown: evt.target.value });
  }

  render() {
    let { markdown } = this.state;

    let cancelLink = `/${this.props.selectedGuidePath}`;

    return (
      <div className="row edit-container">
        <div className="col s6">
          <div className="edit-area">
            <textarea className="materialize-textarea" value={markdown} onChange={evt => this.updateInputValue(evt)}></textarea>
          </div>
          <div>
            <SubmitButton className="light-blue" submit={this.save} loading={this.props.isSavingMarkdown} name="Submit"></SubmitButton>
            <Link to={cancelLink} className="waves-effect waves-light btn blue-grey lighten-3">Cancel</Link>
          </div>
        </div>
        <div className="col s6">
          <div className="markdown-body">
            <ReactMarkdown source={markdown} />
          </div>
        </div>
      </div>
    )
  }
}

MarkdownEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedGuidePath: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  markdown: PropTypes.string.isRequired,
  isSavingMarkdown: PropTypes.bool,
  error: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { guidesByGuidePath, saveMarkdownState } = state
  const { guidePath } = ownProps.match.params;
  const selectedGuidePath = guidePath.replace(/^\//, '').replace(/\/(edit)?$/, '');

  const {
    isFetching,
    lastUpdated,
    guideData
  } = guidesByGuidePath[selectedGuidePath] || {
    isFetching: true,
    guideData: {}
  };

  const markdown = guideData.markdown || '';

  const isSavingMarkdown = saveMarkdownState.isSavingMarkdown || false;
  const isSuccess = saveMarkdownState.isSuccess || false;

  const error = saveMarkdownState.error || null;

  return {
    selectedGuidePath,
    isFetching,
    markdown,
    isSavingMarkdown,
    isSuccess,
    error
  }
}

export default withRouter(connect(mapStateToProps)(MarkdownEdit))