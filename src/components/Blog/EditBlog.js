import React, { Component } from 'react';
import {
  Typography,
  List,
  Button,
  IconButton,
  Toolbar,
  Dialog,
  AppBar,
  Slide,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getBlogs, deleteBlog } from '../../actions/blogActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBlog from './AddBlog';
import EditBlogDialog from './EditBlogDialog';
import styles from '../../styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { blogs, onDelClick } = this.props;
    return (
      <div>
        <Button
          className={classes.editButton}
          size="small"
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.dialogTitle}>
                Блоги
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {blogs.map(blog => (
              <div>
                <ListItem key={blog.id}>
                  <ListItemText
                    primary={blog.name}
                    secondary={blog.description}
                  />
                  {this.props.security.user.username === blog.author && (
                    <div>
                      <small>
                        <EditBlogDialog blog={blog} />
                      </small>
                      <small>
                        <Button
                          component={Link}
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            onDelClick(blog.id);
                          }}
                        >
                          Delete
                        </Button>
                      </small>
                    </div>
                  )}
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <AddBlog />
        </Dialog>
      </div>
    );
  }
}

EditBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  blog: state.blog
});

export default connect(
  mapStateToProps,
  { getBlogs, deleteBlog }
)(styles(EditBlog));
