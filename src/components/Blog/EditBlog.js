import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  editButton: {
    marginLeft: theme.spacing(2)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditBlog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { blogs } = props.blog;
  const [values, setValues] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    props.getBlogs();
  }, []);

  useEffect(() => {
    const { name, description } = props.blog;
    setValues({
      name,
      description
    });
  }, [props.blog]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDelClick = blogId => {
    props.deleteBlog(blogId);
  };

  return (
    <div>
      <Button
        className={classes.editButton}
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
              <ListItem key={blog.blogId}>
                <ListItemText
                  primary={blog.name}
                  secondary={blog.description}
                />
                <div>
                  <small>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                  </small>
                  <small>
                    <Button
                      component={Link}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        onDelClick(blog.blogId);
                      }}
                    >
                      Delete
                    </Button>
                  </small>
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

EditBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getBlogs, deleteBlog })(EditBlog);
