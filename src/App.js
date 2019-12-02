import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './components/Post/Posts';
import Header from './components/Layout/Header';
import AddPost from './components/Post/AddPost';
import Users from './components/User/Users';
import Login from './components/User/Managment/Login';
import SignUp from './components/User/Managment/SignUp';
import { Provider } from 'react-redux';
import store from './store';
import UpdatePost from './components/Post/UpdatePost';
import Post from './components/Post/Post';
import Landing from './components/Layout/Landing';
import Blogs from './components/Blog/Blogs';
import jwt_decode from 'jwt-decode';
import setJwtToken from './security/setJwtToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecureRoute from './security/SecureRoute';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJwtToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Switch>
            <SecureRoute exact path="/add-post" component={AddPost} />
            <SecureRoute exact path="/update-post/:id" component={UpdatePost} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
