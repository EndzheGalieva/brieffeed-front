import React, {Component} from 'react';
import {ButtonBase, Grid, ListItem, Paper, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {deleteBlog} from '../../actions/blogActions';
import PropTypes from 'prop-types';
import styles from '../../styles';

class BlogItem extends Component {
  render() {
    const {classes} = this.props;
    const {blog} = this.props;
    return (
      <ListItem key={blog.id}>
        <Paper className={classes.blogPaper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.blogImage}>
                <img alt="complex" src="/static/images/grid/complex.jpg"/>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {blog.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {blog.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ListItem>
    );
  }
}

BlogItem.propTypes = {
  deleteBlog: PropTypes.func.isRequired
};

export default connect(null, {deleteBlog})(styles(BlogItem));
