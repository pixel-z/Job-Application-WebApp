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
            sortName: false,
            sortRating: false,
            sortDate: false,
        }

        this.sortName = this.sortName.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.sortDate = this.sortDate.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
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
    }
    
    sortName(){
        // job schema
        // array = [email,sop,date,status] + name
        // users = user schema
        var modifiedJob = this.state.job;
        var array = this.state.applicants;
        for (var i = 0; i < array.length; i++) {
            var User = this.state.users.find(user => user.email === array[i].email)
            if (User) array[i].name = User.name;
        }

        var flag = this.state.sortName
        array.sort(function (a, b) {
            if (a.name != undefined && b.name != undefined)
            {
                var str1 = String(a.name), str2 = String(b.name);
                return (1 - flag * 2) * str1.localeCompare(str2);
            }
            else
                return 1;
        });
        for (var i = 0; i < array.length; i++) delete array[i].name;
        
        modifiedJob.applicant = array;
        this.setState({
            job: modifiedJob,
            sortName: !this.state.sortName
        });
    }
    sortRating(){
        var modifiedJob = this.state.job;
        var array = this.state.applicants;
        for (var i = 0; i < array.length; i++) {
            var User = this.state.users.find(user => user.email === array[i].email)
            if (User) array[i].rating = User.rating;
        }

        var flag = this.state.sortRating
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined)
                return (1 - flag * 2) * (a.rating - b.rating);
            else
                return 1;
        });
        for (var i = 0; i < array.length; i++) delete array[i].rating;
        
        modifiedJob.applicant = array;
        this.setState({
            job: modifiedJob,
            sortRating: !this.state.sortRating
        });
    }
    sortDate(){
        var modifiedJob = this.state.job;
        var array = this.state.applicants;
        var flag = this.state.sortDate;
        array.sort(function(a, b) {
            if(a.dateOfApplication != undefined && b.dateOfApplication != undefined)
                return (1 - flag*2) * (new Date(a.dateOfApplication)- new Date(b.dateOfApplication));
            else
                return 1;
        });
        modifiedJob.applicant = array;
        this.setState({
            jobs:modifiedJob,
            sortDate:!this.state.sortDate,
        })
    }

    accept(applicant) {
        var appl = this.state.applicants;
        for (var i = 0; i < appl.length; i++)
        {
            if (appl[i].email === applicant.email)
            {
                appl[i].status = 'accepted';
                appl[i].dateOfJoining = new Date().toISOString();
            }
        }
        this.setState({applicants: appl});

        const val = {
            id: this.state.job._id,
            email: this.state.job.email,
            applicant: this.state.applicants,

            title: this.state.job.title,
            name: this.state.job.name,
            dateofposting: this.state.job.dateofposting,
            deadline: this.state.job.deadline,
            skill: this.state.job.skill,
            jobtype: this.state.job.jobtype,
            duration: this.state.job.duration,
            salary: this.state.job.salary,
            max_applications: this.state.job.max_applications,
            max_positions: this.state.job.max_positions,
            no_applications: this.state.job.no_applications,
            no_positions: this.state.job.no_positions,

            status: "accepted",
            applEmail: applicant.email,
        }

        axios.post('http://localhost:4000/changeJobStatus',val)
            .then(res => {
                alert("Accepted");
                console.log(res.data)
                this.setState({
                    job: res.data,
                })
            })
            .catch(err => {
                console.error(err);
                alert("Error");
            })


        // console.log(this.state.job.applicant)
    }
    reject(applicant) {
        if (applicant.status === 'accepted') {
            alert("Already accepted");
            return;
        }

        var appl = this.state.applicants;
        for (var i = 0; i < appl.length; i++)
        {
            if (appl[i].email === applicant.email)
                appl[i].status = 'rejected';
        }
        this.setState({applicants: appl});

        const val = {
            id: this.state.job._id,
            email: this.state.job.email,
            applicant: this.state.applicants,

            title: this.state.job.title,
            name: this.state.job.name,
            dateofposting: this.state.job.dateofposting,
            deadline: this.state.job.deadline,
            skill: this.state.job.skill,
            jobtype: this.state.job.jobtype,
            duration: this.state.job.duration,
            salary: this.state.job.salary,
            max_applications: this.state.job.max_applications,
            max_positions: this.state.job.max_positions,
            no_applications: this.state.job.no_applications,
            no_positions: this.state.job.no_positions,

            status: "rejected",
        }

        axios.post('http://localhost:4000/changeJobStatus',val)
            .then(res => {
                alert("Rejected");
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
                alert("Error");
            })

    }
    profile(v, sop) {
        this.props.history.push({
            pathname: '/jobview/profile',
            state: {
                profile: v,
                sop: sop,
            }
        })
    }

    display(applicant,c) {
        if (applicant.status === 'rejected') {
            return;
        }
        var v=[];
        this.state.users.map((user) =>{
            if (applicant.email === user.email) {
                v=user;
            }
        })
        if(c==1)
            return (<div>{v.name}</div>);
        else if(c==2)
            return (<div>{v.rating}</div>);
        else if(c==3)
            return (<button onClick={() => this.profile(v,applicant.sop)}>Profile</button>);
        else if(c==4)
            return (<div>{applicant.dateOfApplication}</div>);
        else if(c==5)
            return (<div>{applicant.status}</div>);
        else if(c==6)
            return (<button style={this.state.green} onClick={() => this.accept(applicant)}>Accept</button>)
        else if(c==7)
            return (<button style={this.state.red} onClick={() => this.reject(applicant)}>Reject</button>)
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
                <br/>
                JOB: {this.state.job.title}
                <br/><br/>

                <Grid item xs={12} md={9} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                        <TableCell><button style={this.state.grey} onClick={this.sortName}>Name</button></TableCell>
                                        <TableCell><button style={this.state.grey} onClick={this.sortRating}>Rating</button></TableCell>
                                        <TableCell>Profile</TableCell>
                                        <TableCell><button style={this.state.grey} onClick={this.sortDate}>Date of Application</button></TableCell>
                                        <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.applicants.map((applicant,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{this.display(applicant,1)}</TableCell>
                                        <TableCell>{this.display(applicant,2)}</TableCell>
                                        <TableCell>{this.display(applicant,3)}</TableCell>
                                        <TableCell>{this.display(applicant,4)}</TableCell>
                                        <TableCell>{this.display(applicant,5)}</TableCell>
                                        <TableCell>{this.display(applicant,6)}</TableCell>
                                        <TableCell>{this.display(applicant,7)}</TableCell>
                                    </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>               
                </Grid>    
            </div>
        )
    }
}