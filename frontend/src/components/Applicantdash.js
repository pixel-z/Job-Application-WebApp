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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Fuse from 'fuse.js';

class Applicationdash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobs2: [],
            filteredDuration: [], 
            filteredJobtype: [], 
            filteredSalary: [], 
            sortDuration:true,
            sortSalary:true,
            sortRating:true,
            min: '0',
            max: '10000000000',
            searchTitle: '',

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
        this.durationIcon = this.durationIcon.bind(this);
        this.salaryIcon = this.salaryIcon.bind(this);
        this.ratingIcon = this.ratingIcon.bind(this);
        this.sortDuration = this.sortDuration.bind(this);
        this.sortSalary = this.sortSalary.bind(this);
        this.sortRating = this.sortRating.bind(this);

        this.filterDuration = this.filterDuration.bind(this);
        this.filterJobtype = this.filterJobtype.bind(this);
        this.filterSalary = this.filterSalary.bind(this);
        this.filterCombined = this.filterCombined.bind(this);

        this.fuzzySearch = this.fuzzySearch.bind(this);

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
            this.setState({jobs: response.data, jobs2: response.data, filteredDuration:response.data, filteredJobtype:response.data, filteredSalary:response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    sortDuration(){
        var array = this.state.jobs;
        var flag = this.state.sortDuration;
        array.sort(function(a, b) {
            if(a.duration != undefined && b.duration != undefined)
                return (1 - flag*2) * (a.duration - b.duration);
            else
                return 1;
        });
        this.setState({
            jobs:array,
            sortDuration:!this.state.sortDuration,
        })
    }
    sortSalary(){
        var array = this.state.jobs;
        var flag = this.state.sortSalary;
        array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined)
                return (1 - flag*2) * (a.salary - b.salary);
            else
                return 1;
        });
        this.setState({
            jobs:array,
            sortSalary:!this.state.sortSalary,
        })
    }
    sortRating(){
        var array = this.state.jobs;
        var flag = this.state.sortRating;
        array.sort(function(a, b) {
            if(a.rating != undefined && b.rating != undefined)
                return (1 - flag*2) * (a.rating - b.rating);
            else
                return 1;
        });
        this.setState({
            jobs:array,
            sortRating:!this.state.sortRating,
        })
    }
    salaryIcon(){
        if(this.state.sortSalary) return(<ArrowDownwardIcon/>);
        else return(<ArrowUpwardIcon/>);
    }
    durationIcon(){
        if(this.state.sortDuration) return(<ArrowDownwardIcon/>);
        else return(<ArrowUpwardIcon/>);
    }
    ratingIcon(){
        if(this.state.sortRating) return(<ArrowDownwardIcon/>);
        else return(<ArrowUpwardIcon/>);
    }

    filterCombined(){
        var arr = [this.state.filteredDuration, this.state.filteredJobtype, this.state.filteredSalary];
        var final = arr.shift().filter(function(v){
            return arr.every(function(a){
                return a.indexOf(v) !== -1;
            });
        });
        this.setState({jobs: final});
    }

    filterDuration(e){
        var array = this.state.jobs2;
        const value = e.target.value;

        var filtered = [];
        for(var i=0; i<array.length; i++){
            // console.log(Number(array[i].duration))

            if(Number(array[i].duration) < Number(value))
                filtered.push(array[i]);
        }
        this.state.filteredDuration = filtered;
        this.filterCombined();
        // this.setState({jobs: this.state.filteredDuration});
    }
    filterJobtype(e){
        var array = this.state.jobs2;
        const value = e.target.value;

        var filtered = [];
        for(var i=0; i<array.length; i++){
            if(array[i].jobtype === value)
                filtered.push(array[i]);
        }

        if (value ==="all")
            this.state.filteredJobtype = array;
        else    
            this.state.filteredJobtype = filtered;

        // this.setState({jobs: this.state.filteredJobtype});
        this.filterCombined();
    }
    filterSalary(e){
        var array = this.state.jobs2;

        var filtered = [];
        if (this.state.min.length === 0) 
            this.state.min = 0;
        if (this.state.max.length === 0) 
            this.state.max = 10000000000;
        
        for(var i=0; i<array.length; i++) {
            if(Number(array[i].salary) >= Number(this.state.min) && Number(array[i].salary) <= Number(this.state.max))
                filtered.push(array[i]);
        }

        this.state.filteredSalary = filtered;

        // this.setState({jobs: this.state.filteredSalary});
        this.filterCombined();
    }

    fuzzySearch(e) {
        const fuse = new Fuse(this.state.jobs2, {
            keys: ['title'],
            includeScore: true
        })
        // this.setState({searchTitle: e.target.value});
        this.state.searchTitle = e.target.value;
        const res = fuse.search(this.state.searchTitle);
        const ans = this.state.searchTitle ? res.map(result => result.item) : this.state.jobs2;
        this.setState({jobs: ans});
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
                    <Grid item xs={12} md={3} lg={4}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} onChange={event => this.setState({ min: event.target.value})}/>
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} onChange={event => this.setState({ max: event.target.value})}/>
                                    <Button value="submit" onClick={this.filterSalary}>Submit</Button>
                                </form>                                                                
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} lg={4}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Duration</label>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Select id="duration" onClick={this.filterDuration} defaultValue={7}>
                                    <MenuItem value="7">7</MenuItem>
                                    <MenuItem value="6">6</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                </Select>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} lg={4}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Jobtype</label>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Select id="jobtype" onClick={this.filterJobtype} defaultValue={"all"}>
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="full-time">Full-Time</MenuItem>
                                    <MenuItem value="part-time">Part-Time</MenuItem>
                                    <MenuItem value="work-from-home">Work-from-Home</MenuItem>
                                </Select>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} md={9} lg={12}>
                    <List component="nav" aria-label="mailbox folders" onChange={this.fuzzySearch}>
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
                                            <TableCell><Button onClick={this.sortDuration}>{this.durationIcon()}</Button>Duration</TableCell>
                                            <TableCell><Button onClick={this.sortSalary}>{this.salaryIcon()}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={this.sortRating}>{this.ratingIcon()}</Button>Rating</TableCell>
                                            <TableCell>Deadline</TableCell>
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