import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';

const gridStyles = {
  border: '3px solid #DDDDDD',
  marginBottom: 100
};

class Homepage extends Component {
  render() {
    return (
      <Grid style={gridStyles}>
        <Header title="Travel Diary" />
        <br />
        <Row>
          <Col sm={10} smOffset={1} md={8} mdOffset={2}>
            <h2 style={{textAlign: 'center'}}>Your travel diary</h2>
            <br />
            <LoginForm />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={10} smOffset={1} md={8} mdOffset={2}>
            <hr style={{border: '1px solid #DDDDDD'}} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={10} smOffset={1} md={8} mdOffset={2}>
            <h2 style={{textAlign: 'center'}}>New travel diary</h2>
            <br />
            <RegForm />
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </Grid>
    );
  }
}

export default Homepage;
