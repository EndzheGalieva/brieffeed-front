import React, { createRef, Component } from 'react';
import { FormControl, Button } from '@material-ui/core';
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
import { getPost, editPost } from '../../actions/postActions';
import { getBlogs } from '../../actions/blogActions';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from '../../styles';

const options = ['Publish', 'Draft'];

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      createdDate: null,
      updatedDate: null,
      status: '',
      user: {},
      comments: [],
      id: 0,
      blogId: 0,
      errors: {
        title: ''
      },
      open: false,
      selectedIndex: 1
    };
  }

  anchorRef = createRef(null);

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id, this.props.history);
    this.props.getBlogs();
  }

  componentWillReceiveProps() {
    if (this.props.errors) {
      this.setState({ errors: { title: this.props.errors.title } });
    }
    if (this.props.security.user.username !== this.props.post.author) {
      this.props.history.push('/posts');
    }
    const {
      title,
      content,
      createdDate,
      updatedDate,
      status,
      author,
      comments,
      id,
      blogId
    } = this.props.post;
    this.setState({
      title,
      content,
      createdDate,
      updatedDate,
      status,
      author,
      comments,
      id,
      blogId
    });
  }

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState({ open: prevOpen => !prevOpen });
  };

  handleChange = name => event => {
    const data = event.target.value;
    this.setState({ errors: { [name]: !data } });
    this.setState({ ...this.state, [name]: data });
  };

  handleEditorChange = name => (event, editor) => {
    const data = editor.getData();
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

  onSubmit = event => {
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content,
      status: options[this.state.selectedIndex].toUpperCase(),
      id: this.state.id,
      blogId: this.state.blogId
    };
    this.props.editPost(post, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { blogs } = this.props.blog;
    const { post, errors } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={12}>
          <FormControl
            className={classes.editorFormControl}
            noValidate
            autoComplete="off"
            onSubmit={this.onSubmit}
          >
            <TextField
              required
              error={errors.title}
              label="Title"
              className={classes.textField}
              margin="normal"
              defaultValue={post.title}
              value={this.state.title}
              onChange={this.handleChange('title')}
              name="title"
              helperText={errors.title}
            />
            <TextField
              label="Tags"
              className={classes.textField}
              margin="normal"
              helperText="Separate tags with commas"
            />
            <TextField
              select
              required
              error={errors.blogId}
              label="Blog"
              className={classes.textField}
              value={this.state.blogId}
              onChange={this.handleChange('blogId')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={errors.blogId}
              margin="normal"
            >
              {blogs.map(blog => (
                <MenuItem key={blog.id} value={blog.id}>
                  {blog.name}
                </MenuItem>
              ))}
            </TextField>
            <CKEditor
              editor={ClassicEditor}
              label="Content"
              data={post.content}
              value={this.state.content}
              onChange={this.handleEditorChange('content')}
              name="content"
            />
            <Grid container>
              <Grid item xs={12} align="right">
                <ButtonGroup
                  color="primary"
                  ref={this.anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={this.onSubmit}>
                    {options[this.state.selectedIndex]}
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
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
                  open={this.state.open}
                  anchorEl={this.anchorRef.current}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                      }}
                    >
                      <Paper id="menu-list-grow">
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                disabled={index === 2}
                                selected={index === this.state.selectedIndex}
                                onClick={event =>
                                  this.handleMenuItemClick(event, index)
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
        </Grid>
      </Grid>
    );
  }
}

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post,
  blog: state.blog,
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, getBlogs, editPost })(
  styles(EditPost)
);
