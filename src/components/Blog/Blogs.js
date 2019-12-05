import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogActions';
import BlogItem from './BlogItem';

import EditBlog from './EditBlog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: theme.palette.background.default
  },
  demo: {
    backgroundColor: theme.palette.background.default
  },
  title: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  }
}));

function Blogs(props) {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <div className={classes.title}>
          <Typography variant="h6">Блоги</Typography>
          {props.security.user.role === 'AUTHOR' && <EditBlog />}
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
