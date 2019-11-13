import React, { Component } from "react";
import { Button, Chip, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";
import PropTypes from "prop-types";
import Interweave from "interweave";

class PostItem extends Component {
  // onDelClick = link => {
  //   const token = sessionStorage.getItem('jwt');
  //   fetch(link, { method: 'DELETE', headers: { Authorization: token } })
  //     .then(res => {
  //       this.setState({ open: true, message: 'Статья удалена' });
  //       // this.getPosts();
  //     })
  //     .catch(err => {
  //       this.setState({ open: true, message: 'Ошибка при удалении' });
  //       console.error(err);
  //     });
  // };

  onDelClick = postId => {
    this.props.deletePost(postId);
  };

  // confirmDelete = link => {
  //   confirmAlert({
  //     message: 'Вы уверены, что хотите удалить статью?',
  //     buttons: [
  //       {
  //         label: 'Да',
  //         onClick: () => this.onDelClick(link)
  //       },
  //       {
  //         label: 'Нет'
  //       }
  //     ]
  //   });
  // };

  render() {
    const { post } = this.props;
    return (
      <article className="post post_preview" lang="ru">
        <p className="post_meta">
          <small className="post_user">
            <Chip
              variant="outlined"
              color="primary"
              avatar={<Avatar src="/static/images/avatar/1.jpg" />}
              clickable
              label={`${post.user}`}
              href="#chip"
              size="small"
            />
          </small>
          <small className="post_time">{post.createdDate}</small>
          <br />
          <small>
            <Button
              component={Link}
              to={`/update-post/${post.postId}`}
              variant="outlined"
              color="primary"
            >
              Update
            </Button>
          </small>
          <small>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                // this.confirmDelete(post._links.self.href);
                this.onDelClick(post.postId);
              }}
            >
              Delete
            </Button>
          </small>
        </p>
        <div className="post_body">
          <h2 className="post_title">
            <Link to={`/post/${post.postId}`}>{post.name}</Link>
          </h2>
          <img className="post_img" src={`${post.image}`} alt="" />
          <div className="post_description">
            <Interweave className="post_description" content={post.content} />
          </div>
        </div>
        <Link to={`/post/${post.postId}`}> [Читать дальше]</Link>
      </article>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(null, { deletePost })(PostItem);
