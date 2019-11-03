import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
import { connect, useSelector } from 'react-redux';
import { getPost, updatePost } from '../../actions/postActions';

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
    name: '',
    content: '',
    createdDate: '',
    updatedDate: '',
    postId: 0
    // tag: [],
    // category: 0,
  });

  useEffect(() => {
    const postId = props.match.params.id;
    props.getPost(postId, props.history);
  }, []);

  useEffect(() => {
    const {
      postId,
      name,
      tag,
      category,
      status,
      content,
      createdDate,
      updatedDate
    } = props.post;
    setValues({
      postId,
      name,
      tag,
      status,
      category,
      content,
      createdDate,
      updatedDate
    });
  }, [props.post]);

  // наработки
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const postId = props.match.params.id;
  //     props.getPost(postId, props.history);
  //   }
  //   fetchMyAPI();
  // }, []);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const {
  //       postId,
  //       postName,
  //       tag,
  //       category,
  //       postContent,
  //       createdDate,
  //       updatedDate
  //     } = props.post;
  //     setValues({
  //       postId,
  //       postName,
  //       tag,
  //       category,
  //       postContent,
  //       createdDate,
  //       updatedDate
  //     });
  //   }
  //   fetchMyAPI();
  // }, [props.post]);

  const handleClick = () => {
    alert(`You clicked ${options[selectedIndex]}`);
  };

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

  const handleEditorChange = name => event => {
    setValues({ ...values, [name]: event.target.getContent() });
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onSubmit = () => {
    const post = {
      name: values.name,
      content: values.content,
      status: options[selectedIndex].toUpperCase()
    };
    console.log(options[selectedIndex].toUpperCase())
    alert(`You clicked ${options[selectedIndex]}`);
    props.updatePost(values.postId, post, props.history);
  };

  const { errors } = props;

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
            label="Title"
            className={classes.textField}
            margin="normal"
            value={values.name}
            onChange={handleChange('name')}
            name="name"
            helperText={errors.name}
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
          <Editor
            apiKey="zgthisp1lypefx3m431mxa9bc5gwjaxv7bhv5bbhu4vi1m25"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: `undo redo | formatselect | bold italic backcolor | 
              alignleft aligncenter alignright alignjustify | 
              bullist numlist outdent indent | removeformat | help`
            }}
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

export default connect(
  mapStateToProps,
  { getPost, updatePost }
)(UpdatePost);
