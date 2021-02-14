import {Grid, List} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deletePost, getPosts} from '../../actions/postActions';
import Categories from '../Category/Categories';
import styles from '../../styles';
import PostItem from "./PostItem";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], open: false, message: ''};
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.post !== prevProps.post) {
      this.setState({posts: this.props.post.posts});
    }
  }

  onDelClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const posts = this.state.posts;
    const {classes} = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={9} className={classes.postItem}>
          <List>
            {posts !== undefined && posts.length > 0 ? posts.map(post => (
              <PostItem key={post.id} post={post}/>
            )) : null}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Categories/>
        </Grid>
      </Grid>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  post: state.post
});

export default connect(mapStateToProps, {getPosts, deletePost})(
  styles(Posts)
);
