import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { breadcrumbs } = this.props
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
  selectedGuidePath: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  const { guidesByGuidePath } = state;
  const selectedGuidePath = ownProps.guidePath;

  const { breadcrumbs } = guidesByGuidePath[selectedGuidePath] || { breadcrumbs: [] }

  return {
    breadcrumbs,
    selectedGuidePath
  }
}

export default connect(mapStateToProps)(Navbar);
