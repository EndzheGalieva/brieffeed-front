import React, { Component } from "react";
import { List, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlogs, deleteBlog } from "../../actions/blogActions";
import BlogItem from "./BlogItem";
import EditBlog from "./EditBlog";
import styles from "../../styles";
import Categories from "../Category/Categories";

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

  onDelClick = id => {
    this.props.deleteBlog(id);
  };

  render() {
    const { classes } = this.props;
    const { blogs } = this.props.blog;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={9} className={classes.blogItem}>
          {this.props.security.user.role === "AUTHOR" && (
            <EditBlog blogs={blogs} onDelClick={this.onDelClick} />
          )}
          <List>
            {blogs.map(blog => (
              <BlogItem blog={blog} />
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Categories />
        </Grid>
      </Grid>
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
  styles(Blogs)
);
