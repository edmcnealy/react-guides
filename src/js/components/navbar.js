import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Navbar extends Component {

  render() {
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
          <div className="col s12">
            {items}
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
  const { guidesByGuidePath } = state;
  const { location } = ownProps
  const selectedGuidePath = location.pathname.replace(/^\//, '').replace(/\/(edit)?$/, '');

  const { breadcrumbs } = guidesByGuidePath[selectedGuidePath] || { breadcrumbs: [] }

  return {
    breadcrumbs
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
