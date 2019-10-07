import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>ArticleList</Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
