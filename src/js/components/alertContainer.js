import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeAlert } from '../actions/alertActions';

class AlertContainer extends Component {

  close(alert) {
    const {dispatch} = this.props;
    dispatch(closeAlert(alert));
  }
  togglePause(alert) {
    alert.pause = !alert.pause;
  }

  render() {
    let alerts = this.props.alerts.map(alert => {
      let className = `alert alert-${alert.alertType}`;
      let progressStyle ={ width: `${alert.progress}%` };

      return (
        <div key={alert.id} onClick={() => this.close(alert)} onMouseEnter={() => this.togglePause(alert)} onMouseLeave={() => this.togglePause(alert)}>
          <div className={className} role='alert'>
            <div className="alert-progress" style={progressStyle}></div>
            <span>{alert.message}</span>
          </div>
        </div>
      )
    });

    return (
      <div id='alertContainer' className='alert-right'>
        {alerts}
      </div>
    )
  }
}

AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  const { alertState } = state;
  const alerts = alertState.alerts || [];

  return {
    alerts
  }
}

export default connect(mapStateToProps)(AlertContainer);