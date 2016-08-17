import React, { Component } from 'react';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

const outerDivStyles = {
  height: '100%',
  display: 'flex',
  flexFlow: 'column'
};

class Homepage extends Component {
  render() {
    return (
      <div style={outerDivStyles}>
        <div className="hidden-xs">
          <Header title="John's Travel Diary" homepage={false} />
        </div>
        <NavigationBar blogId={this.props.params.blogId} />
        {this.props.children}
      </div>
    );
  }
}

export default Homepage;
