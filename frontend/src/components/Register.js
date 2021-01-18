import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

export default class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usertype: 'applicant'
        }

        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.usertype === "applicant") {
            this.props.history.push('/applicantregister');
        }
        else {
            this.props.history.push('/recruiterregister');
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Usertype: </label>
                        <br/>
                        <select name="usertype" value={this.state.usertype} onChange={this.onChangeUsertype}>
                            <option name="applicant">applicant</option>
                            <option name="recruiter">recruiter</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}