import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <div>
      	<br />
      	<iframe width="100%" height="600" frameBorder="0" style={{border: 0}} src="http://maps.google.com/maps?hl=cs&q=Adelaide&output=embed"></iframe>
      	<br />
      	<br />
      </div>
    );
  }
}

export default Map;
