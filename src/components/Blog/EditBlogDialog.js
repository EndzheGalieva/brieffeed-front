import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { editBlog, getBlog } from '../../actions/blogActions';
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

function EditBlogDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    description: '',
    blogId: ''
  });

  const [errors, setErrors] = useState({
    name: ''
  });

  useEffect(() => {
    if (props.errors) {
      setErrors({
        name: props.errors.name,
        description: props.errors.description
      });
    }
  }, [props.errors]);

  useEffect(() => {
    const { name, description, blogId } = props.blog;
    setValues({
      name,
      description,
      blogId
    });
  }, [props.blog]);

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
    const blog = {
      name: values.name,
      description: values.description,
      blogId: values.blogId
    };
    props.editBlog(blog);
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
        <DialogTitle id="form-dialog-title">Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            required
            error={errors.name}
            margin="dense"
            id="name"
            label="Blog Name"
            value={values.name}
            onChange={handleChange('name')}
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
            value={values.description}
            onChange={handleChange('description')}
            name="description"
            helperText={errors.description}
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

EditBlogDialog.propTypes = {
  getBlog: PropTypes.func.isRequired,
  editBlog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { getBlog, editBlog })(EditBlogDialog);
