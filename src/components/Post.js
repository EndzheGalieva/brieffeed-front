import React, { Component } from 'react';
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import PostItem from './Post/PostItem.js';
import { connect } from 'react-redux';
import { getPost } from '../actions/postActions';
import PropTypes from 'prop-types';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, open: false, message: '' };
  } 

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId, this.props.history);
  }

  render() {
    const { post } = this.props.post;

    return (
      <div className="App">
        <div className="post_item">
          <PostItem key={post.postId} post={post} />
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
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
