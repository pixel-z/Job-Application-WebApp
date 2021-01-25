import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

export default class Sop extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            name: '',
            email: localStorage.getItem('email'),
            dateofposting: '',
            deadline: '',
            skill: [],
            jobtype: '',
            duration: '',
            salary: 0,
            max_applications: 0,
            max_positions: 0,
            no_applications: 0,
            no_positions: 0,
            open_applications: 0,
            temp: '',  // for sop
            applicant: [{email:'', sop:''}]
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("email")) 
        this.props.history.push("/login");
        
        const data = this.props.location.data
        if (!data)
            this.props.history.push("/applicantdash");
        else
        {
            this.setState({
                id: data._id,
                title: data.title,
                name: data.name,
                email: data.email,
                dateofposting: data.dateofposting,
                deadline: data.deadline,
                skill: data.skill,
                jobtype: data.jobtype,
                duration: data.duration,
                salary: data.salary,
                max_applications: data.max_applications,
                max_positions: data.max_positions,
                no_applications: data.no_applications,
                no_positions: data.no_positions,
                applicant: data.applicant,
            });
        }        
    }

    saveSop = (e) => {
        this.setState({temp: e.target.value});
    }

    async onSubmit(e) {
        e.preventDefault();

        const applicant = this.state.applicant;
        applicant.push({ email: localStorage.getItem('email'), sop: this.state.temp });
        this.setState({ applicant });

        var newJob = {
            id: this.state.id,
            title: this.state.title,
            name: this.state.name,
            email: this.state.email,
            dateofposting: this.state.dateofposting,
            deadline: this.state.deadline,
            skill: this.state.skill,
            jobtype: this.state.jobtype,
            duration: this.state.duration,
            salary: this.state.salary,
            max_applications: this.state.max_applications,
            max_positions: this.state.max_positions,
            no_applications: this.state.no_applications,
            no_positions: this.state.no_positions,
            applicant: this.state.applicant,
        }

        const getUser = {email: localStorage.getItem('email')}
        await axios.post('http://localhost:4000/getuser', getUser).then(res => {
            this.setState({open_applications: Number(res.data.open_applications) + 1});
            // console.log("o0000: "+this.state.open_applications)
        })

        await axios.post('http://localhost:4000/updatejob', newJob)
            .then(res => {
                // console.log("opennnn: "+this.state.open_applications)

                const newUser = {email: localStorage.getItem('email'), open_applications: this.state.open_applications}
                axios.post('http://localhost:4000/updateOpenApp', newUser)
                    .then(res => {
                        console.log(res.data)
                    })
    
                alert('SOP sent successfully')
                this.props.history.push('/applicantdash')                
            })
            .catch((error) => {
                console.log(error)
                alert('Error (Max 250 words allowed)')
            });
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/applicantdash" className="nav-link">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>SOP: </label>
                        <textarea className="form-control" rows="10" onChange={this.saveSop} type="text"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-success"/>
                    </div>
                </form>

            </div>
        )
    }
}