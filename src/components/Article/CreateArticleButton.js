import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CreateArticleButton = () => {
  const classes = useStyles();
  return (
    <div>
      <Fab onClick="/addArticle" color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default CreateArticleButton;
