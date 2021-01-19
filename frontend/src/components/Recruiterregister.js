import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
// import { Form, FormGroup, Label, Progress,Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Applicantregister extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            usertype: 'recruiter',
            contact: '',
            bio: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            usertype: this.state.usertype,
            contact: this.state.contact,
            bio: this.state.bio,
        }
        axios.post('http://localhost:4000/register', newUser)
            .then(res => {
                if(!res.data.name)
                    alert("Invalid credentials");
                else
                    alert("Created\t" + res.data.name);

                console.log(res.data)
            })
            .catch((error) => {
                alert("Invalid inputs");
                console.log(error)
            });

        this.setState({
            name: '',
            email: '',
            password: '',
            contact: '',
            bio: '',
            usertype: 'recruiter'
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
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={event => this.setState({name: event.target.value})}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={event => this.setState({password: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Contact: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contact}
                               onChange={event => this.setState({contact: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <textarea className="form-control" rows="10" onChange={event => this.setState({bio: event.target.value})} type="text"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}