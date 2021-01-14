import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from './components/Login'
import Register from './components/Register'
import UsersList from './components/UsersList'

function App() {
  return (
    <Router>
      <div className="container">
        <Redirect from="/" to="/login" />
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </div>
    </Router>
  );
}

export default App;
