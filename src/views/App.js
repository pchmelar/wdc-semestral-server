import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

class Homepage extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.params.id}</h2>
        <ul>
					<li><IndexLink to={`/${this.props.params.id}`}>Timeline</IndexLink></li>
          <li><Link to={`/${this.props.params.id}/map`}>Map</Link></li>
          <li><Link to={`/${this.props.params.id}/about`}>About</Link></li>
          <li><Link to={`/${this.props.params.id}/newpost`}>New Post</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default Homepage;
