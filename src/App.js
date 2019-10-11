import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import Header from './components/Layout/Header';
import AddArticle from './components/Article/AddArticle';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/article-list" component={ArticleList} />
        <Route exact path="/add-article" component={AddArticle} />
      </div>
    </Router>
  );
}

export default App;
