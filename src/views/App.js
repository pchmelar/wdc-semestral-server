import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

const gridStyles = {
  border: '3px solid #DDDDDD',
  marginBottom: 100
};

class Homepage extends Component {
  render() {
    return (
      <Grid style={gridStyles}>
        <div className="hidden-xs">
          <Header title="John's Travel Diary" />
        </div>
        <NavigationBar blogId={this.props.params.blogId} />
        {this.props.children}
      </Grid>
    );
  }
}

export default Homepage;
