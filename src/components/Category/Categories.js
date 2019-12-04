import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  List,
  Button,
  IconButton,
  Toolbar,
  Dialog,
  Slide,
  AppBar,
  Divider
} from '@material-ui/core';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categoryActions';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 300,
    backgroundColor: theme.palette.background.default
  },
  appBar: {
    position: 'relative'
  },
  demo: {
    backgroundColor: theme.palette.background.default
  },
  title: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  editButton: {
    marginLeft: theme.spacing(2)
  }
}));

function Categories(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    name: '',
    open: false,
    message: ''
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { categories } = props.category;
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <div className={classes.title}>
          <Typography variant="h6">Категории</Typography>
          {props.security.user.role === 'ADMIN' && (
            <div>
              <Button
                className={classes.editButton}
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Edit
              </Button>
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.dialogTitle}>
                      Блоги
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      Сохранить
                    </Button>
                  </Toolbar>
                </AppBar>
                <List>
                  {categories.map(category => (
                    <div>
                      <CategoryItem
                        key={category.categoryId}
                        category={category}
                      />
                      <Divider />
                    </div>
                  ))}
                </List>
              </Dialog>
            </div>
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
