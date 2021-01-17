import React, {Component} from 'react';
// import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';


class Applicationdash extends Component {
    
    constructor(props) {
        super(props);
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
                                <Link to="/applicantdash/profile" className="nav-link">Profile</Link>
                            </li>
                        </ul>
                    </div>
                </nav>    




            </div>
        )
    }
}

export default Applicationdash;