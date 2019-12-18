import React, { Component } from 'react';
import { Typography, List } from '@material-ui/core';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../actions/categoryActions';
import EditCategory from './EditCategory';
import styles from '../../styles';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  async componentDidMount() {
    this.props.getCategories();
    const { categories } = this.props.category;
    this.setState({
      categories
    });
  }

  onDelClick = id => {
    this.props.deleteCategory(id);
  };

  render() {
    const { classes } = this.props;
    const { categories } = this.props.category;
    return (
      <div className={classes.categories}>
        <Typography variant="h6" className={classes.categoriesTitle}>
          Категории
        </Typography>
        {this.props.security.user.role === 'ADMIN' && (
          <EditCategory categories={categories} onDelClick={this.onDelClick} />
        )}
        <List className={classes.list}>
          {categories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </List>
      </div>
    );
  }
}

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, deleteCategory }
)(styles(Categories));
