import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  List,
  Button,
  IconButton,
  Toolbar,
  Dialog,
  Slide,
  AppBar,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogActions';
import BlogItem from './BlogItem';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: theme.palette.background.default
  },
  appBar: {
    position: 'relative'
  },
  demo: {
    backgroundColor: theme.palette.background.default
  },
  title: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  editButton: {
    marginLeft: theme.spacing(2)
  }
}));

function Blogs(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    name: '',
    description: '',
    open: false,
    message: ''
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

  const { blogs } = props.blog;
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <div className={classes.title}>
          <Typography variant="h6">Блоги</Typography>
          {props.security.user.role === 'ADMIN' && (
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
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      Сохранить
                    </Button>
                  </Toolbar>
                </AppBar>
                <List>
                  {blogs.map(blog => (
                    <div>
                      <BlogItem key={blog.blogId} blog={blog} />
                      <Divider />
                    </div>
                  ))}
                </List>
              </Dialog>
            </div>
          )}
        </div>
        <div className={classes.demo}>
          <List>
            {blogs.map(blog => (
              <BlogItem key={blog.blogId} blog={blog} />
            ))}
          </List>
        </div>
      </Grid>
    </div>
  );
}

Blogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog,
  security: state.security
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
