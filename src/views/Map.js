import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const gridStyles = {
  margin: '-20px 0 0 0'
};

class Map extends Component {
  render() {
    return (
      <Grid fluid style={gridStyles}>
      	<Row>
      		<Col>
      			<iframe width="100%" height="600" frameBorder="0" style={{border: 0}} src="http://maps.google.com/maps?hl=cs&q=Adelaide&output=embed"></iframe>
      		</Col>
      	</Row>
      </Grid>
    );
  }
}

export default Map;
