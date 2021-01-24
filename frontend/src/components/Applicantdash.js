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
        this.state = {
            jobs: [],
            sortedjobs: [], 
            sortName:true,

            Apply: {
                backgroundColor: "#0080ff",
                color: "white",
            },
            Applied: {
                backgroundColor: "#26d926",
                color: "white",
            },
            Full: {
                backgroundColor: "red",
                color: "white",
            },
        }
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
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

        axios.get('http://localhost:4000/jobs')
        .then(response => {
            this.setState({jobs: response.data, sortedjobs:response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    sortChange(){
        var array = this.state.jobs;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined)
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            else
                return 1;
        });
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    renderIcon(){
        if(this.state.sortName) return(<ArrowDownwardIcon/>);
        else return(<ArrowUpwardIcon/>);
    }
    buttonDisplay(job){
        var flag=0;

        for (let index = 0; index < job.applicant.length; index++) {
            if(job.applicant[index].email === localStorage.getItem("email")) {
                flag=1;
                break;
            }
        }

        if(flag==1)
            return (<TableCell><button style={this.state.Applied}> Applied </button></TableCell>)
        else if (job.no_applications >= 20) 
            return (<TableCell><button style={this.state.Full}> Full </button></TableCell>)
        else
            return (<TableCell><button style={this.state.Apply} onClick={() => this.onSubmit(job)}> Apply </button></TableCell>)
    }

    onSubmit(job) {
        var email = localStorage.getItem("email");
        var date = new Date().toISOString();
        var flag = 0

        for (let index = 0; index < job.applicant.length; index++) {
            if(job.applicant[index].email === email) {
                flag=1;
                break;
            }
        }

        if (date>job.deadline)
            alert("Deadline already passed")
        else if (flag==1)
            alert("Already applied for this job")
        else {
            this.props.history.push({
                pathname:'/sop',
                data:job
            });
        }
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

                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={9} lg={12}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                            <TableCell>Recruiter Email</TableCell>
                                            <TableCell>Job Type</TableCell>
                                            <TableCell>Duration</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.name}</TableCell>
                                            <TableCell>{job.email}</TableCell>
                                            <TableCell>{job.jobtype}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.rating}</TableCell>
                                            <TableCell>{job.deadline}</TableCell>
                                            {this.buttonDisplay(job)}
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>  
            </div>
        )
    }
}

export default Applicationdash;