import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDirectory } from '../actions/addDirectoryAction';
import { alertSuccess, alertWarn } from '../actions/alertActions';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = 'waves-effect waves-light btn';
    if (this.props.className != null && this.props.className !== '') {
      className += ' ' + this.props.className;
    }

    let loadingIcon = '';
    if (this.props.loading) {
      loadingIcon = (
        <div className="loader preloader-wrapper small active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
          <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
          <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
          <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
        <button className={className} onClick={this.props.submit} disabled={this.props.loading}>
          <i className="material-icons left">{loadingIcon}</i>{this.props.name}
        </button>
    );
  }
}

SubmitButton.propTypes = {
  submit: PropTypes.func.isRequired,
  name: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps)(SubmitButton)