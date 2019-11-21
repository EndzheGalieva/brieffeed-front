import React, { useEffect, useState, useRef } from 'react';
import { FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, updatePost } from '../../actions/postActions';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 150
  },
  input: {
    display: 'none'
  }
}));

const categories = [
  {
    value: 0,
    label: 'category 1'
  },
  {
    value: 1,
    label: 'category 2'
  },
  {
    value: 2,
    label: 'category 3'
  },
  {
    value: 3,
    label: 'category 4'
  }
];

const options = ['Publish', 'Draft'];

function UpdatePost(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [values, setValues] = useState({
    title: '',
    content: '',
    createdDate: null,
    updatedDate: null,
    status: '',
    user: {},
    comments: [],
    postId: 0
  });

  const [errors, setErrors] = useState ({
    title: ''
  })

  useEffect(() => {
    const { id } = props.match.params;
    props.getPost(id, props.history);
  }, []);

  useEffect(() => {
    if (props.errors) {
      setErrors({ title: props.errors.title });
    }
  }, [props.errors.title, props.errors]);

  useEffect(() => {
    const {
      title,
      content,
      createdDate,
      updatedDate,
      status,
      user,
      comments,
      postId
    } = props.post;
    setValues({
      title,
      content,
      createdDate,
      updatedDate,
      status,
      user,
      comments,
      postId
    });
  }, [props.post]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleEditorChange = name => (event, editor) => {
    const data = editor.getData();
    setValues({ ...values, [name]: data });
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onSubmit = () => {
    const post = {
      title: values.title,
      content: values.content,
      status: options[selectedIndex].toUpperCase(),
      postId: values.postId
    };
    props.updatePost(post, props.history);
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <FormControl
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            required
            id="standard-required"
            error={errors.title}
            label="Title"
            className={classes.textField}
            margin="normal"
            defaultValue={props.post.title}
            value={values.title}
            onChange={handleChange('title')}
            name="title"
            helperText={errors.title}
          />
          <TextField
            id="standard-required"
            label="Tags"
            className={classes.textField}
            margin="normal"
            helperText="Separate tags with commas"
          />
          <TextField
            id="standard-select-category"
            select
            label="Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your category"
            margin="normal"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <CKEditor
            editor={ClassicEditor}
            label="Content"
            data={props.post.content}
            value={values.content}
            onChange={handleEditorChange('content')}
            name="content"
          />
          <Grid container>
            <Grid item xs={12} align="right">
              <ButtonGroup
                color="primary"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button onClick={onSubmit}>{options[selectedIndex]}</Button>
                <Button
                  color="primary"
                  size="small"
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Button
                variant="outlined"
                className={classes.button}
                component={Link}
                to="/posts"
                color="secondary"
              >
                Cansel
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom'
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={event =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </div>
  );
}

UpdatePost.propTypes = {
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, updatePost })(UpdatePost);
