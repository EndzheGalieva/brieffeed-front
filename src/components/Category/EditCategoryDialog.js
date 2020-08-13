import React, {Component} from 'react';
import {editCategory, getCategory} from '../../actions/categoryActions';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import styles from '../../styles';

class EditCategoryDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: 0,
      open: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({errors: {...this.props.errors}});
    }
  }

  componentWillReceiveProps() {
    const {name, id} = this.props.category;
    this.setState({name, id});
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleChange = name => event => {
    const data = event.target.value;
    this.setState({...this.state.errors, [name]: !data});
    this.setState({...this.state, [name]: data});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onSubmit = () => {
    const category = {
      name: this.state.name,
      id: this.state.id
    };
    this.props.editCategory(category);
    if (this.state.name) {
      this.handleClose();
    }
  };

  render() {
    const {classes} = this.props;
    const {errors} = this.state;
    return (
      <div>
        <Button
          size="small"
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
          <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              required
              error={errors.name}
              margin="dense"
              id="name"
              label="Category Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              name="name"
              helperText={errors.name}
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

EditCategoryDialog.propTypes = {
  getCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {getCategory, editCategory})(
  styles(EditCategoryDialog)
);
