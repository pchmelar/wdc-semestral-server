import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const headerStyles = {
  height: 150,
  margin: '0px -15px 0px -15px',
  background: 'salmon',
  textAlign: 'center'
};

const blogNameStyles = {
  margin: '50px 0px 0px 0px',
  color: 'white',
  fontSize: '3em',
};

const loginStyles = {
  margin: '10px 30px 0px 0px',
  textAlign: 'right',
  fontSize: '1.1em'
}

const Header = (props) => (
  <div style={headerStyles}>
    <Row>
      <Col sm={8} smOffset={2}>
        <div style={blogNameStyles}>
          {props.title}
        </div>
      </Col>
      <Col sm={2}>
        <div style={loginStyles}>
          <Link to="/" style={{color: 'white'}}>Log in</Link>
        </div>
      </Col>
    </Row>
  </div>
)

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
