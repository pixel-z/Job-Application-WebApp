import React, {Component} from 'react';
// import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';


class Applicationdash extends Component {
    
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e){
        e.preventDefault();
        localStorage.clear();
        this.props.history.push("/login");
    }

    componentDidMount() {
        // console.log("localstorage email: " + localStorage.getItem("email"));
        if (localStorage.getItem("usertype") === "applicant" && localStorage.getItem("email")) 
            this.props.history.push("/applicantdash");
        else if (localStorage.getItem("usertype") === "recruiter" && localStorage.getItem("email")) 
            this.props.history.push("/recruiterdash");
        else
            this.props.history.push("/login");
    }


    render() {
        // const email = this.props.location.aboutProps;
        // console.log(email);
        // if (!email) {
        //     this.props.history.push({
        //         pathname: '/login'
        //     })
        // }

        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link className="nav-link" onClick={this.logout}>Logout</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to={{
                                    pathname: '/profile',
                                    // aboutProps: {
                                    //     email: email
                                    // }
                                }}>Profile</Link>

                            </li>
                        </ul>
                    </div>
                </nav>    

                Welcome {localStorage.getItem('email')}

            </div>
        )
    }
}

export default Applicationdash;