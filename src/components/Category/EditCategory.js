import React from 'react';
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
import CategoryItem from './CategoryItem';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { categories } = props;

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
              <CategoryItem key={category.categoryId} category={category} />
              <Divider />
            </div>
          ))}
        </List>
        <AddCategory />
      </Dialog>
    </div>
  );
}

export default EditCategory;
