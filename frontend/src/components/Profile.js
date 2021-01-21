import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usertype: localStorage.getItem('usertype'),
            email: localStorage.getItem('email'),
            name: '',
            contact: '',
            bio: '',
            // skill: [],
            password: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
        else
            this.props.history.push("/login");

        const newUser = {
            email: localStorage.getItem('email'),
        }
        console.log(newUser.email);

        axios.post('http://localhost:4000/getuser',newUser).then(res => {
            // this.setState({user: res.data})
            this.setState({name: res.data.name})
            this.setState({contact: res.data.contact})
            this.setState({bio: res.data.bio})
            // this.setState({skill: res.data.skill})
            this.setState({password: res.data.password})
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            usertype: this.state.usertype,
            contact: this.state.contact,
            bio: this.state.bio,
            skill: this.state.skill,
            password: this.state.password,
            email: this.state.email,
        }
        axios.post('http://localhost:4000/updateuser', newUser)
            .then(res => {
                console.log("update: "+res.data.name);
                alert("User Updated")
                
                this.setState({
                    name: this.state.name,
                    password: this.state.password,
                    contact: this.state.contact,
                    bio: this.state.bio,
                    // skill: this.state.skill,
                });
            })
    }

    render() {
        // console.log("USER: " + this.state.user);
        if (this.state.usertype === "applicant") {
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/applicantdash">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>    
                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype: {this.state.usertype}</label>
                        </div>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={event => this.setState({name: event.target.value})}
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
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )            
        }
        else if (this.state.usertype === "recruiter")
        {
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/applicantdash">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>    
                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype: {this.state.usertype}</label>
                        </div>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={event => this.setState({name: event.target.value})}
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
                            <input type="number" 
                                className="form-control" 
                                value={this.state.contact}
                                onChange={event => this.setState({contact: event.target.value})}
                                />
                        </div>
                        <div className="form-group">
                            <label>Bio: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.bio}
                                onChange={event => this.setState({bio: event.target.value})}
                                />
                        </div>
                        <div className="form-group">
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default Profile;