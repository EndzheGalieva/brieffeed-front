import React, { Component } from 'react';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostItem extends Component {
  // onDelClick = link => {
  //   const token = sessionStorage.getItem('jwt');
  //   fetch(link, { method: 'DELETE', headers: { Authorization: token } })
  //     .then(res => {
  //       this.setState({ open: true, message: 'Статья удалена' });
  //       // this.getPosts();
  //     })
  //     .catch(err => {
  //       this.setState({ open: true, message: 'Ошибка при удалении' });
  //       console.error(err);
  //     });
  // };

  onDelClick = postId => {
    this.props.deletePost(postId);
  };

  // confirmDelete = link => {
  //   confirmAlert({
  //     message: 'Вы уверены, что хотите удалить статью?',
  //     buttons: [
  //       {
  //         label: 'Да',
  //         onClick: () => this.onDelClick(link)
  //       },
  //       {
  //         label: 'Нет'
  //       }
  //     ]
  //   });
  // };

  render() {
    const { post } = this.props;
    return (
      <React.Fragment>
        <tr key={post.postId}>
          <td>{post.name}</td>
          <td>{post.content}</td>
          <td>{post.createdDate}</td>
          {/* <td>{post.user.userName}</td> */}
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
                // this.confirmDelete(post._links.self.href);
                this.onDelClick(post.postId);
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

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(PostItem);
