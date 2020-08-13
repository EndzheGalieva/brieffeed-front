import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deletePost, getPost} from '../../actions/postActions';
import PropTypes from 'prop-types';
import {Button, Chip, Grid, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Interweave from 'interweave';
import styles from '../../styles';
import Avatar from "@material-ui/core/Avatar";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {post: {}, open: false, message: ''};
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getPost(id, this.props.history);
  }

  onDelClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const {post} = this.props.post;
    const {classes} = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={9}>
          <article className="post post_preview" lang="ru">
            <div className="post_meta">
              <small className="post_user">
                <Chip
                  variant="outlined"
                  color="primary"
                  avatar={<Avatar alt="Airat"
                                  src="/static/images/avatar/1.jpg"/>}
                  clickable
                  label={`${post.user}`}
                  href="#chip"
                  size="small"
                />
              </small>
              <small className="post_time">{post.createdDate}</small>
              <br/>
              {this.props.security.user.username === post.author && (
                <div>
                  <small>
                    <Button
                      size="small"
                      component={Link}
                      to={`/edit-post/${post.id}`}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </small>
                  <small>
                    <Button
                      size="small"
                      component={Link}
                      to={`/posts`}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        this.onDelClick(post.id);
                      }}
                    >
                      Delete
                    </Button>
                  </small>
                </div>
              )}
            </div>
            <div className="post_body">
              <Typography className="post_title" variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <img className="post_img" src={`${post.image}`} alt=""/>
              <div className="post_description">
                <Interweave
                  className="post_description"
                  content={post.content}
                />
              </div>
            </div>
          </article>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, {getPost, deletePost})(styles(Post));
