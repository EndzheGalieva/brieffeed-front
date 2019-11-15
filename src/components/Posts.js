import React, { Component } from 'react';
// import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
// import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import PropTypes from 'prop-types';
import Categories from './Categories.js';
import { Link } from 'react-router-dom';
import { Button, Chip, Avatar } from '@material-ui/core';
import Interweave from 'interweave';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], open: false, message: '' };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  onDelClick = postId => {
    this.props.deletePost(postId);
  };

  // componentDidMount() {
  //   this.fetchPosts();
  // }

  render() {
    const { posts } = this.props.post;

    return (
      <div className="App">
        <Categories />
        <div className="posts_list">
          <ul className="shortcuts_items">
            {posts.map(post => (
              <li className="shortcuts_item">
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
                    <h2 className="post_title">
                      <Link to={`/post/${post.postId}`}>{post.title}</Link>
                    </h2>
                    <img className="post_img" src={`${post.image}`} alt="" />
                    <div className="post_description">
                      <Interweave
                        className="post_description"
                        content={post.content}
                      />
                    </div>
                  </div>
                  <Link to={`/post/${post.postId}`}>[Читать дальше]</Link>
                </article>
              </li>
            ))}
          </ul>
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

  // fetchPosts = () => {
  //   const token = sessionStorage.getItem('jwt');
  //   fetch(SERVER_URL + 'api/posts', {
  //     headers: { Authorization: token }
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({
  //         posts: responseData._embedded.posts
  //       });
  //     })
  //     .catch(err => console.error(err));
  // };

  // onDelClick = link => {
  //   const token = sessionStorage.getItem('jwt');
  //   fetch(link, { method: 'DELETE', headers: { Authorization: token } })
  //     .then(res => {
  //       this.setState({ open: true, message: 'Статья удалена' });
  //       this.fetchPosts();
  //     })
  //     .catch(err => {
  //       this.setState({ open: true, message: 'Ошибка при удалении' });
  //       console.error(err);
  //     });
  // };

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

  // handleClose = (event, reason) => {
  //   this.setState({ open: false });
  // };

  // addPost(post) {
  //   const token = sessionStorage.getItem('jwt');
  //   fetch(SERVER_URL + 'api/posts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token
  //     },
  //     body: JSON.stringify(post)
  //   })
  //     .then(res => this.fetchPosts())
  //     .catch(err => console.error(err));
  // }

  //   updateCar(post, link) {
  //     const token = sessionStorage.getItem('jwt');
  //     fetch(link, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token
  //       },
  //       body: JSON.stringify(post)
  //     })
  //       .then(res => this.setState({ open: true, message: 'Changes saved' }))
  //       .catch(err =>
  //         this.setState({ open: true, message: 'Error when saving' })
  //       );
  //   }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(Posts);
