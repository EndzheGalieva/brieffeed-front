import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  //categories
  categories: {
    flexGrow: 1,
    maxWidth: 300,
    backgroundColor: theme.palette.background.default
  },
  list: {
    backgroundColor: theme.palette.background.default
  },
  title: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  },
  // blogs
  blog: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: 1200,
    margin: 'auto',
    padding: theme.spacing(2, 4, 8, 4),
    justifyContent: 'center'
  },
  blogItem: {
    flexGrow: 1
  },
  blogPaper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
  },
  blogImage: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  // posts
  post: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: 1200,
    margin: 'auto',
    padding: theme.spacing(2, 4, 8, 4),
    justifyContent: 'center'
  },
  postItem: {
    flexGrow: 1
  },
  // edit post
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 150
  },
  input: {
    display: 'none'
  }
});

export default withStyles(styles);
