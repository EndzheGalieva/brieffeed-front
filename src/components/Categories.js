import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List } from '@material-ui/core';
import CategoryItem from './Category/CategoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';

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
    margin: theme.spacing(4, 0, 2)
  }
}));

function Categories(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    open: false,
    message: ''
  });

  useEffect(() => {
    props.getCategories();
  }, [props]);

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
        <Typography variant="h6" className={classes.title}>
          Категории
        </Typography>
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
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
