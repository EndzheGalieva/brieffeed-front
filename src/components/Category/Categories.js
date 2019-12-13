import React, { Component } from 'react';
import { Grid, Typography, List } from '@material-ui/core';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../actions/categoryActions';
import EditCategory from './EditCategory';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 300,
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
});

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: {}
    };
  }

  async componentDidMount() {
    this.props.getCategories();
  }

  onDelClick = categoryId => {
    this.props.deleteCategory(categoryId);
  };

  render() {
    const { classes } = this.props;
    const { categories } = this.props.category;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6">Категории</Typography>
          {this.props.security.user.role === 'ADMIN' && (
            <EditCategory
              categories={categories}
              onDelClick={this.onDelClick}
            />
          )}
        </div>
        <div className={classes.demo}>
          <List>
            {categories.map(category => (
              <CategoryItem key={category.categoryId} category={category} />
            ))}
          </List>
        </div>
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

export default connect(mapStateToProps, { getCategories, deleteCategory })(
  withStyles(styles)(Categories)
);
