import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
// import { Form, FormGroup, Label, Progress,Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Applicantregister extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            rating: 0,
            skill: [],
            education: [{institute:"", startyear:"", endyear:""}],
            usertype: 'applicant'
        }
        this.onSubmit = this.onSubmit.bind(this);
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

    saveEducation = i => e => {
        let education = [...this.state.education]
        education[i]=e.target.value
        this.setState({
            education
        })
    }
    deleteEducation = i => e => {
        e.preventDefault()
        let education = [
            ...this.state.education.slice(0, i),
            ...this.state.education.slice(i + 1)
        ]
        this.setState({
            education
        })
    }
    addEducation = e => {
        e.preventDefault()
        let education = this.state.education.concat([{institute: '',startyear: '',endyear:''}])
        this.setState({
            education
        })
    }
    
    onSubmit(e) {
        e.preventDefault();

        // console.log("skill::::" + this.state.skill);

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            rating: this.state.rating,
            usertype: this.state.usertype,
            skill: this.state.skill,
            education: this.state.education,
        }
        // console.log("newUser skill::::" + newUser.skill);

        axios.post('http://localhost:4000/register', newUser)
            .then(res => {
                if(!res.data.name)
                    alert("Invalid credentials");
                else
                    alert("Created\t" + res.data.name);

                console.log(res.data)
            })
            .catch((error) => {
                alert("Invalid inputs");
                console.log(error)
            });

        this.setState({
            name: '',
            email: '',
            password: '',
            rating: 0,
            skill: [],
            education: [{institute:"", startyear:"", endyear:""}],
            usertype: 'applicant',
        });
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={event => this.setState({name: event.target.value})}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={event => this.setState({password: event.target.value})}
                               />  
                    </div>

                    <div className="form-group">
                        <label>Skill: </label>
                        <br/>
                        {this.state.skill.map((skill, index) => (
                        <span key={index}>
                            <input type="text" onChange={this.saveSkill(index)} value={skill} />
                            <button onClick={this.deleteSkill(index)}>X</button>
                        </span>
                        ))}
                        <br/>
                        <button onClick={this.addSkill}>Add Skill</button>
                    </div>

                    <div className="form-group">
                        <label>Education: </label>
                        <br/>
                        {this.state.education.map((education, index) => (
                        <span key={index}>
                            <input type="text" onChange={this.saveEducation(index)} value={education} />
                            <button onClick={this.deleteEducation(index)}>X</button>
                        </span>
                        ))}
                        <br/>
                        <button onClick={this.addeducation}>Add Education</button>
                    </div>
                    
                    <div className="form-group">
                        <label>Rating: </label>
                        <input type="text" className="form-control" value={this.state.rating} onChange={event => this.setState({rating: event.target.value})} />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}