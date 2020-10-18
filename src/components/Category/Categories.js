import React, {Component} from 'react';
import {List, Typography} from '@material-ui/core';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteCategory, getCategories} from '../../actions/categoryActions';
import EditCategory from './EditCategory';
import styles from '../../styles';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], open: false, message: ''
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.category !== prevProps.category) {
      this.setState({categories: this.props.category.categories});
    }
  }

  onDelClick = id => {
    this.props.deleteCategory(id);
  };

  render() {
    const {classes} = this.props;
    const categories = this.state.categories;
    return (
      <div className={classes.categories}>
        <Typography variant="h6" className={classes.categoriesTitle}>
          Категории
        </Typography>
        {this.props.security.user.role === 'ADMIN' && (
          <EditCategory categories={categories} onDelClick={this.onDelClick}/>
        )}
        <List className={classes.list}>
          {categories !== undefined && categories.length > 0 ? categories.map(
            category => (
              <CategoryItem key={category.id} category={category}/>
            )) : null}
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

export default connect(mapStateToProps, {getCategories, deleteCategory})(
  styles(Categories)
);
