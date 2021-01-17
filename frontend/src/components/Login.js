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

    componentDidMount() {
        // console.log("localstorage email: " + localStorage.getItem("email"));
        // console.log("localstorage usertype: " + localStorage.getItem("usertype"));

        // adding localstorage so that after logging in and refreshing the page, data is not lost (in applicantdash, etc)
        if (localStorage.getItem("usertype") === "applicant" && localStorage.getItem("email")) 
            this.props.history.push("/applicantdash");
        else if (localStorage.getItem("usertype") === "recruiter" && localStorage.getItem("email")) 
            this.props.history.push("/recruiterdash");
        else
            this.props.history.push("/login");
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            usertype: this.state.usertype
        }

        axios.post('http://localhost:4000/login', newUser)
            .then(res => {
                alert("Logged In\t");

                localStorage.setItem("email",newUser.email);
                localStorage.setItem("usertype",newUser.usertype);

                console.log("localstorage email: " + localStorage.getItem("email") + "localstorage usertype: " + localStorage.getItem("usertype"));
                
                // window.location.href = '/users';

                // redirecting and sending data to dash
                if (newUser.usertype === "applicant") 
                {
                    this.props.history.push({
                        pathname: '/applicantdash',
                        aboutProps: newUser.email   // (var aboutProps can have any name)
                    });
                }
                else
                {
                    this.props.history.push({
                        pathname: '/recruiterdash',
                        aboutProps: newUser.email   // (var aboutProps can have any name)
                    });
                }
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