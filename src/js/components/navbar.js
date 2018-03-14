import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUser } from '../services/authService';
import { logout } from '../services/authService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render() {
    let authContainer = '';
    let user = getUser();
    if (user != null) {
      authContainer = (
        <div>
          <ul className="right hide-on-med-and-down">
            <li className="right-align">
              Howdy {user.username}!
          </li>
            <li>
            <a className="waves-effect waves-light btn-flat" onClick={this.logout} style={{color:'white'}}>
              <i className="material-icons left">exit_to_app</i>Logout
            </a>
            </li>
          </ul>
        </div>
      );
    }

    const { breadcrumbs } = this.props || []

    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        url: '',
        text: 'Guides'
      })
    }
    let items = breadcrumbs.map((breadcrumb) => {
      return (
        <a href={`#${breadcrumb.url}`} className="breadcrumb" key={breadcrumb.url}>{breadcrumb.text}</a>
      )
    });

    return (
      <nav>
        <div className="nav-wrapper row">
          <div className="col s8">
            {items}
          </div>
          <div className="col s4">
            {authContainer}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  const { guidesByGuidePath, user } = state;
  const { location } = ownProps
  const selectedGuidePath = location.pathname.replace(/^\//, '').replace(/\/(edit)?$/, '');

  const { breadcrumbs } = guidesByGuidePath[selectedGuidePath] || { breadcrumbs: [] }

  return {
    breadcrumbs,
    user
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
