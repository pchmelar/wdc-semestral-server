import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import NewPostForm from '../components/NewPostForm';

class NewPost extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm={10} smOffset={1} md={8} mdOffset={2}>
            <h2 style={{textAlign: 'center'}}>Publish new post</h2>
            <br />
            <NewPostForm />
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default NewPost;
