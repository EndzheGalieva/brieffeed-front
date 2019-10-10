import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { green } from '@material-ui/core/colors';
import AddArticle from './Article/AddArticle.js';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], open: false, message: '' };
  }

  render() {
    const rows = this.state.articles.map((article, index) => (
      <tr key={index}>
        <td>{article.articleName}</td>
        <td>{article.description}</td>
        <td>{article.createdDate}</td>
        <td>{article.user}</td>
        <td>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.confirmDelete(article._links.self.href);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="App">
        <Grid container>
          <Grid item>
            <AddArticle
              addArticle={this.addArticle}
              fetchArticles={this.fetchArticles}
            />
          </Grid>
        </Grid>
        <table>
          <tbody>{rows}</tbody>
        </table>
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
    this.fetchArticles();
  }

  fetchArticles = () => {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/articles', {
      headers: { 'Authorization': token }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          articles: responseData._embedded.articles
        });
      })
      .catch(err => console.error(err));
  };

  onDelClick = link => {
    const token = sessionStorage.getItem('jwt');
    fetch(link, { method: 'DELETE', headers: { 'Authorization': token } })
      .then(res => {
        this.setState({ open: true, message: 'Статья удалена' });
        this.fetchArticles();
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

  addArticle(article) {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(article)
    })
      .then(res => this.fetchArticles())
      .catch(err => console.error(err));
  }

  updateCar(article, link) {
    const token = sessionStorage.getItem('jwt');
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(article)
    })
      .then(res => this.setState({ open: true, message: 'Changes saved' }))
      .catch(err =>
        this.setState({ open: true, message: 'Error when saving' })
      );
  }
}

export default ArticleList;
