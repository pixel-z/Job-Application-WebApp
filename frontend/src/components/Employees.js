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

export default class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            red: {background: "red", color: "white"},
            green: {background: "#26d926", color: "white"},
            grey: {background: "grey", color: "black"},
            users: [],
            jobs: [],
            array: [],
            sortTitle: true,
            sortName: true,
            sortRating: true,
            sortDate: true,

        }

        this.sortTitle = this.sortTitle.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
        else
            this.props.history.push("/login");

        await axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        await axios.get('http://localhost:4000/jobs')
            .then(response => {
                this.setState({jobs: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })

        var arr = [];
        this.state.jobs.map((job) => {
            if (job.email === localStorage.getItem("email")) {
                var applicant = job.applicant;
                for (var i = 0; i < applicant.length; i++) {
                    if (applicant[i].status === "accepted") {
                        this.state.users.map((user)=> {
                            if (user.email === applicant[i].email) {
                                arr.push({
                                    title: job.title,
                                    name: user.name,
                                    rating: user.rating,
                                    dateOfJoining: applicant[i].dateOfJoining,
                                    jobtype: job.jobtype,
                                });
                            }
                        })
                    }
                }
            }
        })
        this.setState({array: arr});
    }

    sortTitle() {
        var ar = this.state.array;
        var flag = this.state.sortTitle;
        ar.sort(function(a, b) {
            if(a.title != undefined && b.title != undefined)
            {
                var s1 = String(a.title), s2 = String(b.title);
                return (1 - flag*2) * s1.localeCompare(s2);
            }
            else
            return 1;
        });
        
        this.setState({
            array:ar,
            sortTitle:!this.state.sortTitle,
        })
    }
    sortName() {
        var ar = this.state.array;
        var flag = this.state.sortName;
        ar.sort(function(a, b) {
            if(a.name != undefined && b.name != undefined)
            {
                var s1 = String(a.name), s2 = String(b.name);
                return (1 - flag*2) * s1.localeCompare(s2);
            }
            else
            return 1;
        });
        
        this.setState({
            array:ar,
            sortName:!this.state.sortName,
        })
    }
    sortRating() {
        var ar = this.state.array;
        var flag = this.state.sortRating;
        ar.sort(function(a, b) {
            if(a.rating != undefined && b.rating != undefined)
            {
                var s1 = String(a.rating), s2 = String(b.rating);
                return (1 - flag*2) * s1.localeCompare(s2);
            }
            else
            return 1;
        });
        
        this.setState({
            array:ar,
            sortRating:!this.state.sortRating,
        })
    }
    sortDate() {
        var ar = this.state.array;
        var flag = this.state.sortDate;
        ar.sort(function(a, b) {
            if(a.dateOfJoining != undefined && b.dateOfJoining != undefined)
            {
                return (1 - flag*2) * (new Date(a.dateOfJoining)- new Date(b.dateOfJoining));
            }
            else
            return 1;
        });
        
        this.setState({
            array:ar,
            sortDate:!this.state.sortDate,
        })
    }

    onSubmit(e) {
        e.preventDefault();

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
                Welcome: {localStorage.getItem('email')}
                <br/><br/>

                <Grid item xs={12} md={9} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                        <TableCell><button style={this.state.grey} onClick={this.sortTitle}>Title</button></TableCell>
                                        <TableCell><button style={this.state.grey} onClick={this.sortName}>Name</button></TableCell>
                                        <TableCell><button style={this.state.grey} onClick={this.sortRating}>Rating</button></TableCell>
                                        <TableCell><button style={this.state.grey} onClick={this.sortDate}>dateOfJoining</button></TableCell>
                                        <TableCell>JobType</TableCell>
                                        <TableCell>Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.array.map((employee,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{employee.title}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.rating}</TableCell>
                                        <TableCell>{employee.dateOfJoining}</TableCell>
                                        <TableCell>{employee.jobtype}</TableCell>
                                        <TableCell><button >Rate</button></TableCell>
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