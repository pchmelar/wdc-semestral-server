import React from 'react';

const headerStyles = {
  height: 150,
  margin: '0px -15px 0px -15px',
  background: 'salmon',
  textAlign: 'center'
};

const blogNameStyles = {
  padding: '60px 0px 0px 0px',
  color: 'white',
  fontSize: '2em'
};

const Header = (props) => (
  <div style={headerStyles}>
    <div style={blogNameStyles}>
      {props.title}
    </div>
  </div>
)

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
