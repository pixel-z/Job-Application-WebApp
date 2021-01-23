import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link className="nav-link" onClick={this.logout}>Logout</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to={{pathname: '/profile'}}>Profile</Link>

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