import { withStyles, fade } from '@material-ui/core/styles';

const styles = theme => ({
  // general
  textField: {
    width: 'auto',
    minWidth: theme.spacing(30),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  addButton: {
    marginLeft: theme.spacing(2)
  },
  // header
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuIcon: {
    marginRight: theme.spacing(1)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    textDecoration: 'none',
    color: 'inherit'
  },
  flex: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  avatar: {
    width: 30,
    height: 30
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  // categories
  categories: {
    flexGrow: 1,
    maxWidth: 300,
    backgroundColor: theme.palette.background.default
  },
  list: {
    backgroundColor: theme.palette.background.default
  },
  categoriesTitle: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4, 1, 2)
  },
  // edit dialog
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  editButton: {
    marginLeft: theme.spacing(2)
  },
  appBar: {
    position: 'relative'
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
    width: 64,
    height: 64
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
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  //signUp
  signUpHeader: {
    display: 'flex',
    position: 'relative'
  },
  signUpContainer: {
    display: 'flex',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    justify: 'center',
    alignItems: 'center'
  },
  //login
  loginHeader: {
    display: 'flex',
    position: 'relative'
  },
  loginContainer: {
    display: 'flex',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    justify: 'center',
    alignItems: 'center'
  }
});

export default withStyles(styles);
