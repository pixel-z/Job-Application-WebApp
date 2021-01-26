import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from './components/Login'
import Register from './components/Register'
import Applicantregister from './components/Applicantregister'
import Recruiterregister from './components/Recruiterregister'
import Applicantdash from './components/Applicantdash'
import Recruiterdash from './components/Recruiterdash'
import UsersList from './components/UsersList'
import Profile from './components/Profile'
import Sop from './components/Sop'
import JobView from './components/JobView'
import ProfileView from './components/ProfileView'

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
        <Route path="/recruiterdash" exact component={Recruiterdash}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/sop" exact component={Sop}/>
        <Route path="/jobview" exact component={JobView}/>
        <Route path="/jobview/profile" exact component={ProfileView}/>
      </div>
    </Router>
  );
}

export default App;
