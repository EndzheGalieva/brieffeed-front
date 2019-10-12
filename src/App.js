import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Header from './components/Layout/Header';
import AddPost from './components/Post/AddPost';
import Users from './components/Users';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/add-post" component={AddPost} />
        <Route exact path="/log-in" component={Login} />
      </div>
    </Router>
  );
}

export default App;
