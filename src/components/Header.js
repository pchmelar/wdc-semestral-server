import React from 'react';

const Header = (props) => (
  <div>
    <h2>{props.blogName}</h2>
  </div>
)

Header.propTypes = {
  blogName: React.PropTypes.string.isRequired
};

export default Header;
