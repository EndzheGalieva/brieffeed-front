import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
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
}));

const categories = [
  {
    value: 0,
    label: 'category 1'
  },
  {
    value: 1,
    label: 'category 2'
  },
  {
    value: 2,
    label: 'category 3'
  },
  {
    value: 3,
    label: 'category 4'
  }
];

const options = ['Save in draft', 'Save and publish'];

const handleEditorChange = e => {
  console.log('Content was updated:', e.target.getContent());
};

function AddArticle() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    alert(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    category: 0
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <FormControl
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="standard-required"
            label="Title"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-required"
            label="Tags"
            className={classes.textField}
            margin="normal"
            helperText="Separate tags with commas"
          />
          <TextField
            id="standard-select-category"
            select
            label="Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your category"
            margin="normal"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Editor
            apiKey="zgthisp1lypefx3m431mxa9bc5gwjaxv7bhv5bbhu4vi1m25"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: `undo redo | formatselect | bold italic backcolor | 
            alignleft aligncenter alignright alignjustify | 
            bullist numlist outdent indent | removeformat | help`
            }}
            onChange={handleEditorChange}
          />
          <Grid container>
            <Grid item xs={12} align="right">
              <ButtonGroup
                color="primary"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                  color="primary"
                  size="small"
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Button
                variant="outlined"
                className={classes.button}
                component={Link}
                to="/article-list"
                color="secondary"
              >
                Cansel
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom'
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={event =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </React.Fragment>
  );
}

export default AddArticle;
