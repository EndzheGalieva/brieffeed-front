import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs, deleteBlog } from '../../actions/blogActions';
import BlogItem from './BlogItem';
import EditBlog from './EditBlog';

const styles = theme => ({
  blogs: {
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: theme.palette.background.default
  },
  list: {
    backgroundColor: theme.palette.background.default
  },
  title: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  }
});

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    };
  }

  async componentDidMount() {
    this.props.getBlogs();
    const { blogs } = this.props.blog;
    this.setState({
      blogs
    });
  }

  onDelClick = blogId => {
    this.props.deleteBlog(blogId);
  };

  render() {
    const classes = this.props;
    const { blogs } = this.props.blog;
    return (
      <div className={classes.blogs}>
        <Typography variant="h6" className={classes.title}>
          Блоги
        </Typography>
        {this.props.security.user.role === 'AUTHOR' && <EditBlog />}
        <List className={classes.list}>
          {blogs.map(blog => (
            <BlogItem key={blog.blogId} blog={blog} />
          ))}
        </List>
      </div>
    );
  }
}

Blogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog,
  security: state.security
});

export default connect(mapStateToProps, { getBlogs, deleteBlog })(
  withStyles(styles)(Blogs)
);
