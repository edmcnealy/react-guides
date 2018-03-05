import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDirectory } from '../actions/addDirectoryAction';

class AddDir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: '',
      guidePath: location.pathname.replace(/^\//, '')
    };

    this.addDirectory = this.addDirectory.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log('component did update')
    if (this.props.error !== prevProps.error) {
      console.log('error change', this.props.error)
    }
    if (this.props.isAddingDirectory !== prevProps.isAddingDirectory && !this.props.isAddingDirectory) {
      if (this.props.wasAdded) {
        this.setState({
          directoryName: ''
        });
      }
    }
  }

  addDirectory(target) {
    if (target.charCode == 13) {
      const { dispatch } = this.props;
      dispatch(createDirectory(this.state.directoryName, this.state.guidePath));
    }
  }

  updateInputValue(evt) {
    this.setState({
      directoryName: evt.target.value
    });
  }

  render() {
    let isAddingDiv;
    if (this.props.isAddingDirectory) {
      isAddingDiv = <div>Loading...</div>
    } else {
      isAddingDiv = '';
    }

    return (
      <div className="col s12 m6">
        <div className="input-field">
          <input type="text" id="directoryName" className="validate" onKeyPress={this.addDirectory} autoFocus="autoFocus" value={this.state.directoryName} onChange={evt => this.updateInputValue(evt)} />
          <label htmlFor="directoryName">Add new directory</label>
        </div>
        {/* {isAddingDiv} */}
      </div>
    )
  }
}

AddDir.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAddingDirectory: PropTypes.bool.isRequired,
  wasAdded: PropTypes.bool.isRequired,
  error: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { addDirectoryState } = state

  const isAddingDirectory = addDirectoryState.isAddingDirectory || false;
  const wasAdded = addDirectoryState.wasAdded || false;
  const error = addDirectoryState.error || null;
  return {
    isAddingDirectory,
    wasAdded,
    error
  }
}

export default connect(mapStateToProps)(AddDir)