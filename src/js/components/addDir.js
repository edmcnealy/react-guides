import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDirectory } from '../actions/addDirectoryAction';
import { success, warn } from '../actions/alertActions';

class AddDir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: '',
      guidePath: location.pathname.replace(/^\//, ''),
      isAdding: false
    };

    this.addDirectory = this.addDirectory.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAddingDirectory !== prevProps.isAddingDirectory && !this.props.isAddingDirectory) {
      const { dispatch } = this.props;
      
      if (this.props.wasAdded && this.props.error === null) {
        dispatch(success(`Added the directory ${this.state.directoryName}.`));
        this.setState({
          directoryName: ''
        });
        this.toggleAdd();
      }
      if (!this.props.wasAdded) {
        dispatch(warn(`The directory ${this.state.directoryName} already exists.`));
      }
    }
  }

  addDirectory(target) {
    if (target.charCode == 13) {
      const { dispatch } = this.props;
      dispatch(createDirectory(this.state.directoryName, this.state.guidePath));
    }
  }

  toggleAdd() {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }

  updateInputValue(evt) {
    this.setState({
      directoryName: evt.target.value
    });
  }
  selectAll(event) {
    event.target.select();
  }

  render() {
    let loadingDiv;
    if (this.props.isAddingDirectory) {
      loadingDiv = <div>Loading...</div>
    } else {
      loadingDiv = '';
    }

    let errorDiv;
    if (this.props.error === null || this.props.error === '') {
      errorDiv = '';
    } else {
      errorDiv = <div>{this.props.error}</div>
    }

    let main;
    if (this.state.isAdding) {
      main = (
        <div className='input-field'>
          <input type='text' id='directoryName' className='validate' onKeyPress={this.addDirectory} autoFocus='autoFocus' value={this.state.directoryName} onChange={evt => this.updateInputValue(evt)} onBlur={this.toggleAdd} onFocus={this.selectAll}/>
          <label htmlFor='directoryName'>Add new directory</label>
        </div>
      );
    } else {
      main = <button className='waves-effect waves-light btn' onClick={this.toggleAdd}>Add Directory</button>;
    }

    return (
      <div className='col s12 m6'>
        {main}
        {/* {loadingDiv} */}
        <div className='red-text'>{errorDiv}</div>
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