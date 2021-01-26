import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class MyApp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email'),
            jobs: [],
            array: [],
            users: [],
            rating: 5,
        }
    }


    async componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
        else
            this.props.history.push("/login");

        await axios.get('http://localhost:4000/jobs')
        .then(response => {
            this.setState({jobs: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })

        await axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })

        var arr=[];
        this.state.jobs.map((job) => {
            var applicant = job.applicant;
            for (var i = 0; i < applicant.length; i++) {
                if (applicant[i].email === localStorage.getItem("email")) {
                    arr.push({ 
                        title: job.title,
                        dateOfJoining: applicant[i].dateOfJoining,
                        salary: job.salary,
                        name: job.name,
                        status: applicant[i].status,
                        email: job.email,
                    })
                }
            }
        })
        this.setState({array: arr})

    }

    func(employee,ind) {
        if (employee.status === 'accepted') {
            return (
                <Select id={ind} defaultValue='5'>
                <MenuItem value='1'> 1</MenuItem>
                <MenuItem value='2'> 2</MenuItem>
                <MenuItem value='3'> 3</MenuItem>
                <MenuItem value='4'> 4</MenuItem>
                <MenuItem value='5'> 5</MenuItem>
                </Select>   
            )
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link className="nav-link" to={{pathname: '/applicantdash'}}>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </nav>    
                <br/>
                Welcome {this.state.email}

                <Grid item xs={12} md={9} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Recruiter</TableCell>
                                        <TableCell>dateOfJoining</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.array.map((employee,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{employee.title}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.dateOfJoining}</TableCell>
                                        <TableCell>{employee.salary}</TableCell>
                                        <TableCell>{this.func(employee,ind)}</TableCell>
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