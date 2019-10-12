import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CreatePostButton = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Fab
        component={Link}
        to="/add-post"
        color="default"
        aria-label="add"
        className={classes.fab}
        size="small"
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default CreatePostButton;
