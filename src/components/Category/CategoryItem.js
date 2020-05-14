import React, {Component} from 'react';
import {ListItem, ListItemText} from '@material-ui/core';
import {connect} from 'react-redux';
import {deleteCategory} from '../../actions/categoryActions';
import PropTypes from 'prop-types';

class CategoryItem extends Component {
  render() {
    const {category} = this.props;
    return (
      <ListItem>
        <ListItemText primary={category.name}/>
      </ListItem>
    );
  }
}

CategoryItem.propTypes = {
  deleteCategory: PropTypes.func.isRequired
};

export default connect(null, {deleteCategory})(CategoryItem);
