import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createBlog, getBlogs } from '../../actions/blogActions';
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

function AddBlog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    categoryId: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const { name, description } = props.blog;
    setValues({
      name,
      description
    });
  }, [props.blog]);

  useEffect(() => {
    if (props.errors) {
      setErrors({
        name: props.errors.name,
        description: props.errors.description
      });
    }
  }, [props.errors]);

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
      description: values.description
    };
    props.createBlog(blog, props.history);
    if (values.name && values.description) {
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
        Add Blog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        autoComplete="off"
      >
        <DialogTitle id="form-dialog-title">Add Blog</DialogTitle>
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

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  blogs: state.blogs,
  blog: state.blog
});

export default connect(mapStateToProps, { getBlogs, createBlog })(AddBlog);
