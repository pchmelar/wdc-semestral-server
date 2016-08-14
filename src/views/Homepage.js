import React, { Component } from 'react';
import { Link } from 'react-router';

class Homepage extends Component {
  render() {
    return (
      <div>
        <h2>Homepage</h2>
        <ul>
					<li><Link to="/john">John's Travel Diary</Link></li>
        </ul>
      </div>
    );
  }
}

export default Homepage;
