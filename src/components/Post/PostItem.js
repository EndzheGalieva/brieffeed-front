import React, { Component } from 'react';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class PostItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <React.Fragment>
        <tr key={post.postId}>
          <td>{post.postName}</td>
          <td>{post.postContent}</td>
          <td>{post.createdDate}</td>
          <td>{post.user}</td>
          <td>
            <Button
              component={Link}
              to={`/update-post/${post.postId}`}
              variant="outlined"
              color="primary"
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                this.confirmDelete(post._links.self.href);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PostItem;
