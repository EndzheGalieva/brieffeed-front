import React, { Component, createRef } from "react";
import { FormControl, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Chip from "@material-ui/core/Chip";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import { getBlogs } from "../../actions/blogActions";
import { getTag } from "../../actions/tagActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "../Editor/ClassicEditor";
import styles from "../../styles";

const options = ["Publish", "Draft"];

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tags: [],
      content: "",
      status: "",
      createdDate: null,
      updatedDate: null,
      user: {},
      comments: [],
      id: 0,
      blogId: null,
      errors: {},
      open: false,
      selectedIndex: 1
    };
  }

  anchorRef = createRef(null);

  componentDidMount() {
    this.props.getBlogs();
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: { ...this.props.errors } });
    }
  }

  handleChange = name => event => {
    const data = event.target.value;
    if (name === "tags") {
      this.setState(previousState => ({ tags: [...previousState.tags, data] }));
    } else this.setState({ ...this.state, [name]: data });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState({ open: prevOpen => !prevOpen });
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
      tags: this.state.tags,
      content: this.state.content,
      status: options[this.state.selectedIndex].toUpperCase(),
      blogId: this.state.blogId
    };
    console.log(post);
    this.props.createPost(post, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { blogs } = this.props.blog;
    const { errors } = this.state;
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
              value={this.state.title}
              onChange={this.handleChange("title")}
              name="title"
              helperText={errors.title}
            />
            <Autocomplete
              multiple
              id="tags-filled"
              size="small"
              autoComplete
              autoHightlight
              clearOnEscape
              freeSolo
              defaultValue={this.state.tags}
              onChange={this.handleChange("tags")}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Add Tag"
                  className={classes.textField}
                  margin="normal"
                  name="tags"
                  fullWidth
                />
              )}
            />
            <TextField
              select
              required
              error={errors.blogId}
              label="Blog"
              className={classes.textField}
              value={this.state.blogId}
              onChange={this.handleChange("blogId")}
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
              value={this.state.content}
              onChange={this.handleEditorChange("content")}
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
                    aria-owns={this.state.open ? "menu-list-grow" : undefined}
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
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
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

AddPost.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  tag: state.tag,
  blog: state.blog,
  errors: state.errors
});

export default connect(mapStateToProps, { getBlogs, getTag, createPost })(
  styles(AddPost)
);
