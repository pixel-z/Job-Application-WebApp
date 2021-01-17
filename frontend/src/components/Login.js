import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            usertype: 'applicant'
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    
    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            usertype: this.state.usertype
        }
        console.log(newUser);
        axios.post('http://localhost:4000/login', newUser)
            .then(res => {
                alert("Logged In\t");
                console.log(res.data)
                
                // window.location.href = '/users';
                this.props.history.push({
                    pathname: '/applicantdash',
                    // data: res.data
                });
            })
            .catch((error) => {
                alert("Invalid inputs");
                console.log(error)
            });
            
        this.setState({
            email: '',
            password: '',
            usertype: 'applicant'
        });
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
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Usertype: </label>
                        <br/>
                        <select name="usertype" value={this.state.usertype} onChange={this.onChangeUsertype}>
                            <option name="applicant">applicant</option>
                            <option name="recruiter">recruiter</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}