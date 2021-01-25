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
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-datepicker/dist/react-datepicker.css";

class Recruiterdash extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            sortedUsers: [], 
            sortName:true,

            title: '',
            name: '',
            email: localStorage.getItem('email'),
            dateofposting: new Date(),
            deadline: new Date(),
            skill: [],
            jobtype: 'full-time',
            duration: 0,
            salary: '',
            max_applications: '',
            max_positions: '',
            applicant: [{email: '',sop: ''}],
        };
        
        this.logout = this.logout.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({users: response.data, sortedUsers:response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    saveSkill = i => e => {
        let skill = [...this.state.skill]
        skill[i]=e.target.value
        this.setState({
            skill
        })
    }
    deleteSkill = i => e => {
        e.preventDefault()
        let skill = [
            ...this.state.skill.slice(0, i),
            ...this.state.skill.slice(i + 1)
        ]
        this.setState({
            skill
        })
    }
    addSkill = e => {
        e.preventDefault()
        let skill = this.state.skill.concat([''])
        this.setState({
            skill
        })
    }

    sortChange(){
        var array = this.state.users;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined)
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            else
                return 1;
        });
        this.setState({
            users:array,
            sortName:!this.state.sortName,
        })
    }
    renderIcon(){
        if(this.state.sortName) return(<ArrowDownwardIcon/>);
        else return(<ArrowUpwardIcon/>);
    }
    handleChange(date) {
        this.setState({
            deadline: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            title: this.state.title,
            email: this.state.email,
            dateofposting: this.state.dateofposting,
            deadline: this.state.deadline,
            skill: this.state.skill,
            jobtype: this.state.jobtype,
            duration: this.state.duration,
            salary: this.state.salary,
            max_applications: this.state.max_applications,
            max_positions: this.state.max_positions,
        };

        axios.post('http://localhost:4000/createjob', newJob)
            .then(res => {
                alert('New job created')
            })
            .catch((error) => {
                alert("Invalid credentials "+error.message);
            });
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
                            <ListItem text>
                                <h3>Filters</h3>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
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
                </Grid>

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
                                    options={this.state.users}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.date}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>
                <br/><br/><br/>

                <h4>Create Job Listing</h4>
                
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={event => this.setState({title: event.target.value})}
                               />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                            <DatePicker
                                selected={this.state.deadline}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={20}
                                timeCaption="time"
                                dateFormat="d MMMM, yyyy h:mm aa"
                            />
                    </div>
                    <div className="form-group">
                        <label>Skill: </label>
                        {this.state.skill.map((skill, index) => (
                        <span key={index}>
                            <input type="text" onChange={this.saveSkill(index)} value={skill} />
                            <button onClick={this.deleteSkill(index)}>x</button>
                        </span>
                        ))}
                        <br/>
                        <button onClick={this.addSkill}>Add Skill</button>
                    </div>
                    <div className="form-group">
                        <label>JobType: </label>
                        <br/>
                        <select name="jobtype" value={this.state.jobtype} onChange={event => this.setState({jobtype: event.target.value})}>
                            <option name="full-time">full-time</option>
                            <option name="part-time">part-time</option>
                            <option name="work-from-home">work-from-home</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Duration(months): </label>
                        <br/>
                        <select name="duration" value={this.state.duration} onChange={event => this.setState({duration: event.target.value})}>
                            <option name="0">0</option>
                            <option name="1">1</option>
                            <option name="2">2</option>
                            <option name="3">3</option>
                            <option name="4">4</option>
                            <option name="5">5</option>
                            <option name="6">6</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.salary}
                               onChange={event => this.setState({salary: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Max Applications: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.max_applications}
                               onChange={event => this.setState({max_applications: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Max Positions: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.max_positions}
                               onChange={event => this.setState({max_positions: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-success"/>
                    </div>
                </form>

                <br/><br/><br/>
            </div>
        )
    }
}

export default Recruiterdash;