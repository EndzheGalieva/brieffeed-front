import React, { Component } from 'react';
import { CssBaseline, Container } from '@material-ui/core';

class PostItem extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">Пост</Container>
      </React.Fragment>
    );
  }
}

export default PostItem;
