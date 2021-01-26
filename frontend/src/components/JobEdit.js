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
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns'

export default class JobView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            red: {background: "red", color: "white"},
            green: {background: "#26d926", color: "white"},
            grey: {background: "grey", color: "black"},

            job: JSON.parse(localStorage.getItem('currjob')),
            applicants: JSON.parse(localStorage.getItem('currjob')).applicant,
            users: [],
            max_applications: '',
            max_positions: '',
            deadline: new Date().toISOString(),
        }

        this.changeDeadline = this.changeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
        else
            this.props.history.push("/login");

        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })

        this.setState({max_applications: this.state.job.max_applications})
        this.setState({max_positions: this.state.job.max_positions})
        this.setState({deadline: this.state.job.deadline})
    }

    changeDeadline(e) {
        this.setState({deadline: e.toISOString()})
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            id: this.state.job._id,
            max_applications: this.state.max_applications,
            max_positions: this.state.max_positions,
            deadline: this.state.deadline,

            title: this.state.job.title,
            name: this.state.job.name,
            email: this.state.job.email,
            dateofposting: this.state.job.dateofposting,
            skill: this.state.job.skill,
            jobtype: this.state.job.jobtype,
            duration: this.state.job.duration,
            salary: this.state.job.salary,
            no_applications: this.state.job.no_applications,
            no_positions: this.state.job.no_positions,
            applicant: this.state.job.applicant,
        }
        axios.post('http://localhost:4000/updatejob',newJob)
            .then(res => {
                alert('Updated job successfully');
                this.props.history.push('/recruiterdash');
            })
            .catch(err => {
                console.error(err)
                alert("Update job failed");
            })
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
                        </ul>
                    </div>
                </nav>  

                Editing JOB: {this.state.job.title}
                <br/><br/>

                <div className="box">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Max no of Applications</label>
                            <input type="text" className="form-control" value={this.state.max_applications} onChange={e=> {this.setState({max_applications: e.target.value})}} />
                        </div>
                        <div className="form-group">
                            <label>Max no of Positions</label>
                            <input type="text" className="form-control" value={this.state.max_positions} onChange={e=> {this.setState({max_positions: e.target.value})}} />
                        </div>
                        <div className="form-group">
                        <label>Deadline: </label>
                            <DatePicker
                                selected={parseISO(this.state.deadline)}
                                onChange={this.changeDeadline}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={20}
                                timeCaption="time"
                                dateFormat="d MMMM, yyyy h:mm aa"
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Save Changes" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}