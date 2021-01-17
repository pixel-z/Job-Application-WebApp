import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        // const newUser = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password,
        //     usertype: this.state.usertype
        // }
        // axios.post('http://localhost:4000/register', newUser)
        //     .then(res => {
        //         if(!res.data.name)
        //             alert("Invalid credentials");
        //         else
        //             alert("Created\t" + res.data.name);

        //         console.log(res.data)
        //     })
        //     .catch((error) => {
        //         alert("Invalid inputs");
        //         console.log(error)
        //     });

        // this.setState({
        //     name: '',
        //     email: '',
        //     password: '',
        //     usertype: ''
        // });
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Logout</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/applicantdash" className="nav-link">Dashboard</Link>
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
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile;