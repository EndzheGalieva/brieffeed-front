import React, { Component } from 'react';
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../actions/postActions';
import PropTypes from 'prop-types';
import { Chip, Avatar, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, open: false, message: '' };
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId, this.props.history);
  }

  onDelClick = postId => {
    this.props.deletePost(postId);
  };

  render() {
    const { post } = this.props.post;

    return (
      <div className="App">
        <div className="post_item">
          <article className="post post_preview" lang="ru">
            <p className="post_meta">
              <small className="post_user">
                <Chip
                  variant="outlined"
                  color="primary"
                  avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                  clickable
                  label={`${post.user}`}
                  href="#chip"
                  size="small"
                />
              </small>
              <small className="post_time">{post.createdDate}</small>
              <br />
              <small>
                <Button
                  component={Link}
                  to={`/update-post/${post.postId}`}
                  variant="outlined"
                  color="primary"
                >
                  Update
                </Button>
              </small>
              <small>
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
              </small>
            </p>
            <div className="post_body">
              <Typography className="post_title" variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <img className="post_img" src={`${post.image}`} alt="" />
              <div className="post_description">
                <Interweave
                  className="post_description"
                  content={post.content}
                />
              </div>
            </div>
          </article>
        </div>
        <Snackbar
          style={{
            width: 300,
            backgroundColor: green[600],
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={2500}
          message={this.state.message}
        />
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost, deletePost })(Post);
