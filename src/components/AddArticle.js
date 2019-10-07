import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { articleName: '', description: '' };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New article</h3>
          <form>
            <TextField
              type="text"
              placeholder="Article Name"
              name="articleName"
              onChange={this.handleChange}
            />
            <br />
            <TextField
              type="text"
              placeholder="Description"
              name="description"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.cancelSubmit}
            >
              Отмена
            </Button>
          </form>
        </SkyLight>
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: '10px' }}
            onClick={() => this.refs.addDialog.show()}
          >
            New article
          </Button>
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    var newArticle = {
      articleName: this.state.articleName,
      description: this.state.description
    };
    this.props.addArticle(newArticle);
    this.refs.addDialog.hide();
  };

  cancelSubmit = event => {
    event.preventDefault();
    this.refs.addDialog.hide();
  };
}

export default AddArticle;
