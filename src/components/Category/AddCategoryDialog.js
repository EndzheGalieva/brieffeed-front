import React, {Component} from 'react';
import {createCategory, getCategories} from '../../actions/categoryActions';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import styles from '../../styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: 0,
      errors: {},
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({errors: {...this.props.errors}});
    }
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
    this.setState({name: '', errors: {}, open: false});
  };

  onSubmit = () => {
    const category = {
      name: this.state.name
    };
    this.props.createCategory(category);
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
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.addButton}
        >
          Add Category
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          autoComplete="off"
        >
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
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

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {getCategories, createCategory})(
  styles(AddCategory)
);
