import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Header from './components/Layout/Header';
import AddPost from './components/Post/AddPost';
import Users from './components/Users';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import store from './store';
import UpdatePost from './components/Post/UpdatePost';
import Post from './components/Post';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/add-post" component={AddPost} />
          <Route exact path="/update-post/:id" component={UpdatePost} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
