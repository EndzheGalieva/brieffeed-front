import React, { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteBlog } from "../../actions/blogActions";
import PropTypes from "prop-types";

class BlogItem extends Component {

  render() {
    const { blog } = this.props;
    return (
        <ListItem>
        <ListItemText
          primary={`${blog.name}`}
          secondary={`${blog.description}`}
        />
      </ListItem>
    );
  }
}

BlogItem.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(null, { deleteBlog })(BlogItem);
