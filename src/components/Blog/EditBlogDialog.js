import React, { Component, createRef } from 'react';
import { editBlog, getBlog } from '../../actions/blogActions';
import { getCategories } from '../../actions/categoryActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem
} from '@material-ui/core';
import styles from '../../styles';

class EditBlogDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      id: 0,
      categoryId: 0,
      open: false,
      errors: {}
    };
  }

  anchorRef = createRef(null);

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: { ...this.props.errors } });
    }
  }

  componentWillReceiveProps() {
    const { name, description, id, categoryId } = this.props.blog;    
    this.setState({ name, description, id, categoryId });
  }

  handleClickOpen = () => {
    this.props.getCategories();
    this.setState({ open: true });
  };

  handleChange = name => event => {
    const data = event.target.value;
    this.setState({ ...this.state.errors, [name]: !data });
    this.setState({ ...this.state, [name]: data });
  };

  handleClose = event => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }
    this.setState({ open: false });
  };

  onSubmit = () => {
    const blog = {
      name: this.state.name,
      description: this.state.description,
      id: this.state.id,
      categoryId: this.state.categoryId
    };
    this.props.editBlog(blog);
    if (this.state.name && this.state.description) {
      this.handleClose();
    }
  };

  render() {
    const { classes } = this.props;
    const { categories } = this.props.category;
    const { errors } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.addButton}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          autoComplete="off"
        >
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogContent>
            <TextField
              select
              required
              error={errors.categoryId}
              label="Category"
              className={classes.textField}
              value={this.state.categoryId}
              onChange={this.handleChange('categoryId')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={errors.categoryId}
              margin="normal"
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              error={errors.name}
              margin="dense"
              id="name"
              label="Blog Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              name="name"
              helperText={errors.name}
              fullWidth
            />
            <TextField
              required
              error={errors.description}
              margin="dense"
              id="description"
              label="Blog Description"
              value={this.state.description}
              onChange={this.handleChange('description')}
              name="description"
              helperText={errors.description}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditBlogDialog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  category: state.category
});

export default connect(mapStateToProps, { getBlog, getCategories, editBlog })(
  styles(EditBlogDialog)
);
