import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import PostItem from './Post/PostItem.js';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], open: false, message: '' };
  }

  render() {
    const rows = this.state.posts.map((post, index) => (
      <tr key={index}>
        <td>{post.postName}</td>
        <td>{post.postContent}</td>
        <td>{post.createdDate}</td>
        <td>{post.user}</td>
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
    ));

    return (
      <div className="App">
        <table>
          <tbody>{rows}</tbody>
        </table>
        <PostItem />
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

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/posts', {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          posts: responseData._embedded.posts
        });
      })
      .catch(err => console.error(err));
  };

  onDelClick = link => {
    const token = sessionStorage.getItem('jwt');
    fetch(link, { method: 'DELETE', headers: { Authorization: token } })
      .then(res => {
        this.setState({ open: true, message: 'Статья удалена' });
        this.fetchPosts();
      })
      .catch(err => {
        this.setState({ open: true, message: 'Ошибка при удалении' });
        console.error(err);
      });
  };

  confirmDelete = link => {
    confirmAlert({
      message: 'Вы уверены, что хотите удалить статью?',
      buttons: [
        {
          label: 'Да',
          onClick: () => this.onDelClick(link)
        },
        {
          label: 'Нет'
        }
      ]
    });
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  addPost(post) {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(post)
    })
      .then(res => this.fetchPosts())
      .catch(err => console.error(err));
  }

  updateCar(post, link) {
    const token = sessionStorage.getItem('jwt');
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(post)
    })
      .then(res => this.setState({ open: true, message: 'Changes saved' }))
      .catch(err =>
        this.setState({ open: true, message: 'Error when saving' })
      );
  }
}

export default Posts;
