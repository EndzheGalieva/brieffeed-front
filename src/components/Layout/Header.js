import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {
  Badge,
  Menu,
  MenuItem,
  Icon,
  Grid,
  Avatar,
  Tooltip
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
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
  }
}));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { validToken, user } = props.security;

  useEffect(() => {
    if (validToken && user) {
      setAuth(true);
    }
    if (!validToken && user) {
      setAuth(false);
    }
  }, [validToken, user]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    props.logout();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Настройки</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth && (
        <div>
          <MenuItem component={Link} to="/add-post">
            <Icon className={classes.menuIcon} color="inherit" aria-label="add">
              <AddCircleIcon />
            </Icon>
            <p>Написать</p>
          </MenuItem>
          {/* <MenuItem component={Link} to="/notifications">
            <Badge badgeContent={11} color="secondary">
              <Icon
                className={classes.menuIcon}
                aria-label="show 11 new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </Icon>
            </Badge>
            <p>Уведомления</p>
          </MenuItem> */}
          <MenuItem component={Link} to="/profile">
            <Icon
              className={classes.menuIcon}
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Grid container justify="center" alignItems="center">
                <Avatar
                  alt="airat"
                  src="https://avatars0.githubusercontent.com/u/8280416?s=480&v=4"
                  className={classes.avatar}
                />
              </Grid>
            </Icon>
            <p>Профиль</p>
          </MenuItem>
          <MenuItem onClick={logout} component={Link}>
            <Icon
              className={classes.menuIcon}
              color="inherit"
              aria-label="logout"
            >
              <MeetingRoomIcon />
            </Icon>
            <p>Выйти</p>
          </MenuItem>
        </div>
      )}
      {!auth && (
        <div>
          <MenuItem component={Link} to="/login">
            Войти
          </MenuItem>
          <MenuItem component={Link} to="/signup">
            Регистрация
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Tooltip title="Главная страница">
            <Typography
              variant="h4"
              to="/"
              className={classes.title}
              component={Link}
              noWrap
            >
              Brieffeed
            </Typography>
          </Tooltip>

          <div className={classes.flex}></div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div />
          <div className={classes.sectionDesktop}>
            <Button component={Link} to="/posts" color="inherit">
              Посты
            </Button>
            <Button component={Link} to="/blogs" color="inherit">
              Блоги
            </Button>
            {/* <Button component={Link} to="/news" color="inherit">
              Новости
            </Button> */}
            {auth && (
              <div>
                <Tooltip title="Написать">
                  <IconButton
                    component={Link}
                    to="/add-post"
                    color="inherit"
                    aria-label="add"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Уведомления">
                  <IconButton
                    component={Link}
                    to="/notifications"
                    aria-label="show 11 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={11} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip> */}
                <Tooltip title="Профиль">
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                  >
                    <Grid container justify="center" alignItems="center">
                      <Avatar
                        alt="airat"
                        src="https://avatars0.githubusercontent.com/u/8280416?s=480&v=4"
                        className={classes.avatar}
                      />
                    </Grid>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Выйти">
                  <IconButton
                    color="inherit"
                    aria-label="logout"
                    component={Link}
                    to="/"
                    onClick={logout}
                  >
                    <MeetingRoomIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            {!auth && (
              <div>
                <Button component={Link} to="/login" color="inherit">
                  Войти
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Регистрация
                </Button>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, { logout })(Header);
