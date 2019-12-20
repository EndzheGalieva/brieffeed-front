import React, { Component } from 'react';
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
import AddCategoryDialog from './AddCategoryDialog';
import { Link } from 'react-router-dom';
import EditCategoryDialog from './EditCategoryDialog';
import styles from '../../styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { categories, onDelClick } = this.props;
    return (
      <div>
        <Button
          className={classes.editButton}
          size="small"
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
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
                <ListItem key={category.id}>
                  <ListItemText primary={category.name} />
                  <small>
                    <EditCategoryDialog category={category} />
                  </small>
                  <small>
                    <Button
                      component={Link}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        onDelClick(category.id);
                      }}
                    >
                      Delete
                    </Button>
                  </small>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <AddCategoryDialog />
        </Dialog>
      </div>
    );
  }
}

export default styles(EditCategory);
