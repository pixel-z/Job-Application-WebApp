import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from './components/Login'
import Register from './components/Register'
import Applicantregister from './components/Applicantregister'
import Recruiterregister from './components/Recruiterregister'
import Applicantdash from './components/Applicantdash'
import UsersList from './components/UsersList'
import Profile from './components/Profile'

function App() {
  return (
    <Router>
      <div className="container">
        {/* <Redirect from="/" to="/login" /> */}
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/applicantregister" exact component={Applicantregister}/>
        <Route path="/recruiterregister" exact component={Recruiterregister}/>
        <Route path="/applicantdash" exact component={Applicantdash}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/users" exact component={UsersList}/>
      </div>
    </Router>
  );
}

export default App;
