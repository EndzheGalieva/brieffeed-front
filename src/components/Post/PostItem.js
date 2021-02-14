import React, {Component} from "react";
import {Avatar, Button, Chip, ListItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import Interweave from "interweave";
import {connect} from "react-redux";
import styles from "../../styles";
import PropTypes from "prop-types";
import {deletePost} from "../../actions/postActions";

class PostItem extends Component {
  render() {
    const {classes} = this.props;
    const {post} = this.props;
    return (
      <ListItem className="shortcuts_item" key={post.id}>
        <article className="post post_preview" lang="ru">
          <div className="post_meta">
            <small className="post_user">
              <Chip
                variant="outlined"
                color="primary"
                avatar={<Avatar alt="Airat"
                                src="/static/images/avatar/1.jpg"/>}
                clickable
                label={`${post.user}`}
                href="#chip"
                size="small"
              />
            </small>
            <small
              className="post_time">{post.createdDate}</small>
            <br/>
            {this.props.security.user.username === post.author
            && (
              <div>
                <small>
                  <Button
                    size="small"
                    component={Link}
                    to={`/edit-post/${post.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                </small>
                <small>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      this.onDelClick(post.id);
                    }}
                  >
                    Delete
                  </Button>
                </small>
              </div>
            )}
          </div>
          <div className="post_body">
            <h2 className="post_title">
              <Link className={classes.link}
                    to={`/post/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <img className="post_img" src={`${post.image}`}
                 alt=""/>
            <div className="post_description">
              <Interweave
                className="post_description"
                content={post.description}
              />
            </div>
          </div>
          <Link className={classes.link} to={`/post/${post.id}`}>
            [Читать дальше]
          </Link>
        </article>
      </ListItem>
    );
  }
}

PostItem.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, {deletePost})(styles(PostItem));
