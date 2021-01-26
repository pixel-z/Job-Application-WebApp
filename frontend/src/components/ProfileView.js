import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
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
import { Link } from 'react-router-dom';


export default class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.profile,
            sop: this.props.location.state.sop,
        }
    }

    componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
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
                                <Link className="nav-link" to={{pathname: '/recruiterdash'}}>Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to={{pathname: '/jobview'}}>Back</Link>
                            </li>
                        </ul>
                    </div>
                </nav>    

                Applicant's details<br/><br/>

                <div className="form-group">
                    <label><b>Username:</b> {this.state.user.name}</label>
                </div>
                <div className="form-group">
                    <label><b>Email:</b> {this.state.user.email}</label>
                </div>
                <div className="form-group">
                    <label><b>Skill:</b></label>
                    <br />
                    {this.state.user.skill.map((skill, index) => (
                        <span key={index}>
                            {skill}
                            <br/>
                        </span>
                    ))}
                </div>
                <label><b>Education:</b></label>
                <div>
                    {this.state.user.education.map((education, index) => {
                        return (
                            <div className="box" key={index}>
                                <p><b>Institute</b>: {education.institute}, <b>StartYear</b>: {education.startyear}, <b>EndYear</b>: {education.endyear}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="form-group">
                    <label><b>SOP:</b><br/> {this.state.sop}</label>
                </div>
            </div>
        )
    }
}