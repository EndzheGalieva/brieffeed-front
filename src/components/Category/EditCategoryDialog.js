import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { editCategory, getCategory } from '../../actions/categoryActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  addButton: {
    marginLeft: theme.spacing(2)
  }
}));

function EditCategoryDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    id: ''
  });

  const [errors, setErrors] = useState({
    name: ''
  });

  useEffect(() => {
    if (props.errors) {
      setErrors({ name: props.errors.name });
    }
  }, [props.errors]);

  useEffect(() => {
    const { name, id } = props.category;
    setValues({
      name,
      id
    });
  }, [props.category]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = name => event => {
    const data = event.target.value;
    setErrors({ ...errors, [name]: !data });
    setValues({ ...values, [name]: data });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const category = {
      name: values.name,
      id: values.id
    };
    props.editCategory(category);
    if (values.name) {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.addButton}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
            value={values.name}
            onChange={handleChange('name')}
            name="name"
            helperText={errors.name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditCategoryDialog.propTypes = {
  getCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { getCategory, editCategory })(
  EditCategoryDialog
);
