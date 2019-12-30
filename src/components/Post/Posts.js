import { Avatar, Button, Chip, List, ListItem, Grid } from '@material-ui/core';
import Interweave from 'interweave';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, getPosts } from '../../actions/postActions';
import Categories from '../Category/Categories';
import styles from '../../styles';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], open: false, message: '' };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  onDelClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const { posts } = this.props.post;
    const { classes } = this.props;
    return (
      <Grid container className={classes.post}>
        <Grid item xs={12} md={9} className={classes.postItem}>
          <List>
            {posts.map(post => (
              <ListItem className="shortcuts_item" key={post.id}>
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
                  </p>
                  <div className="post_body">
                    <h2 className="post_title">
                      <Link className={classes.link} to={`/post/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <img className="post_img" src={`${post.image}`} alt="" />
                    <div className="post_description">
                      <Interweave
                        className="post_description"
                        content={post.description}
                      />
                    </div>
                  </div>
                  <Link className={classes.link} to={`/post/${post.id}`}>
                    [Читать дальше]
                  </Link>
                </article>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Categories />
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

export default connect(mapStateToProps, { getPosts, deletePost })(
  styles(Posts)
);
