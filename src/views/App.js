import React, { Component } from 'react';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header blogName={this.props.params.blogId} />
        <NavigationBar blogId={this.props.params.blogId} />
        {this.props.children}
      </div>
    );
  }
}

export default Homepage;
