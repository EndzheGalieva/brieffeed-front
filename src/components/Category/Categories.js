import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List } from '@material-ui/core';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categoryActions';
import EditCategory from './EditCategory';

const useStyles = makeStyles(theme => ({
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
}));

function Categories(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    categoryId: ''
  });

  useEffect(() => {
    props.getCategories();
  }, []);

  useEffect(() => {
    const { name } = props.category;
    setValues({
      name
    });
  }, [props.category]);

  const { categories } = props.category;
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <div className={classes.title}>
          <Typography variant="h6">Категории</Typography>
          {props.security.user.role === 'ADMIN' && (
            <EditCategory categories={categories} />
          )}
        </div>
        <div className={classes.demo}>
          <List>
            {categories.map(category => (
              <CategoryItem key={category.categoryId} category={category} />
            ))}
          </List>
        </div>
      </Grid>
    </div>
  );
}

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
