import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Slide,
  AppBar,
  Typography,
  List,
  Divider,
  ListItemText,
  ListItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCategory from './AddCategory';
import { deleteCategory, getCategories } from '../../actions/categoryActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  addButton: {
    marginLeft: theme.spacing(2)
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  editButton: {
    marginLeft: theme.spacing(2)
  },
  appBar: {
    position: 'relative'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    categoryId: ''
  });

  const [errors, setErrors] = useState({
    name: ''
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

  useEffect(() => {
    if (props.errors) {
      setErrors({ name: props.errors.name });
    }
  }, [props.errors]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelClick = categoryId => {
    props.deleteCategory(categoryId);
  };

  const { categories } = props.category;

  return (
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
              Категории
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {categories.map(category => (
            <div>
              <ListItem key={category.categoryId}>
                <ListItemText primary={category.name} />
                <div>
                  <small>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                  </small>
                  <small>
                    <Button
                      component={Link}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        onDelClick(category.categoryId);
                      }}
                    >
                      Delete
                    </Button>
                  </small>
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <AddCategory />
      </Dialog>
    </div>
  );
}

EditCategory.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories, deleteCategory })(
  EditCategory
);
