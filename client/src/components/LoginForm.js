import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, InputGroup, FormControl, Button } from 'react-bootstrap';

const labelStyles = {
  fontWeight: 400,
  fontSize: '1.10em'
}

class LoginForm extends Component {
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  } 
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  }
  render() {
    return (
      <Form horizontal noValidate onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={3} componentClass={ControlLabel} style={labelStyles}>
            Email
          </Col>
          <Col sm={6}>
            <InputGroup>
              <InputGroup.Addon><span className="glyphicon glyphicon-envelope"></span></InputGroup.Addon>
              <FormControl type="email" autoCapitalize="off" autoCorrect="off" autoComplete="email" onChange={this.handleEmailChange} />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3} componentClass={ControlLabel} style={labelStyles}>
            Password
          </Col>
          <Col sm={6}>
            <InputGroup>
              <InputGroup.Addon><span className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
              <FormControl type="password" autoComplete="password" onChange={this.handlePasswordChange} />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={6}>
            <Button type="submit">
              Log in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginForm;
