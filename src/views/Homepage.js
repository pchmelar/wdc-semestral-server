import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Header from '../components/Header';

const gridStyles = {
  border: '1px solid #DDDDDD'
};

class Homepage extends Component {
  render() {
    return (
      <Grid style={gridStyles}>
        <div className="hidden-xs">
          <Header title="Travel Diary" />
        </div>
        <h2>Login Form</h2>
      </Grid>
    );
  }
}

export default Homepage;
