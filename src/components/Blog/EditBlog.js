import React, {Component} from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddBlogDialog from './AddBlogDialog';
import EditBlogDialog from './EditBlogDialog';
import styles from '../../styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    const {blogs, onDelClick} = this.props;
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
                <CloseIcon/>
              </IconButton>
              <Typography variant="h6" className={classes.dialogTitle}>
                Блоги
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {blogs.map(blog => (
              <ListItem key={blog.id}>
                <ListItemText
                  primary={blog.name}
                  secondary={blog.description}
                />
                <EditBlogDialog blog={blog}/>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    onDelClick(blog.id);
                  }}
                >
                  Delete
                </Button>
                <Divider/>
              </ListItem>
            ))}
          </List>
          <AddBlogDialog/>
        </Dialog>
      </div>
    );
  }
}

export default styles(EditBlog);
