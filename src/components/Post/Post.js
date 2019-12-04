import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../../actions/postActions';
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
    const { id } = this.props.match.params;
    this.props.getPost(id, this.props.history);
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
              {this.props.security.user.username === post.author && (
                <div>
                  <small>
                    <Button
                      component={Link}
                      to={`/update-post/${post.postId}`}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </small>
                  <small>
                    <Button
                      component={Link}
                      to={`/posts`}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        this.onDelClick(post.postId);
                      }}
                    >
                      Delete
                    </Button>
                  </small>
                </div>
              )}
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
  deletePost: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  post: state.post
});

export default connect(mapStateToProps, { getPost, deletePost })(Post);
