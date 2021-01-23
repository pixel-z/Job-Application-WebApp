import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usertype: localStorage.getItem('usertype'),
            email: localStorage.getItem('email'),
            name: '',
            contact: '',
            bio: '',
            skill: [],
            education: [{institute:'', startyear:'', endyear:''}],
            password: '',
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

    saveEducation = (i, e) => {
        const { name, value } = e.target;
        const education = [...this.state.education];
        education[i][name] = value;
        this.setState({ education });
    }
    addEducation = () => {
        const item = { institute: '', startyear: '', endyear: '' }
        this.setState({
            education: [...this.state.education, item]
        });
    }
    deleteEducation = (id) => {
        let education = [...this.state.education]
        education.splice(id, 1);
        this.setState({
            education
        });
    }

    componentDidMount() {
        if ((localStorage.getItem("usertype") === "applicant" || localStorage.getItem("usertype") === "recruiter") && localStorage.getItem("email")) 
        ;
        else
            this.props.history.push("/login");

        const newUser = {
            email: localStorage.getItem('email'),
        }
        // console.log(newUser.email);

        axios.post('http://localhost:4000/getuser',newUser).then(res => {
            // this.setState({user: res.data})
            this.setState({name: res.data.name})
            this.setState({contact: res.data.contact})
            this.setState({bio: res.data.bio})
            this.setState({skill: res.data.skill})
            this.setState({education: res.data.education})
            this.setState({password: res.data.password})
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            usertype: this.state.usertype,
            contact: this.state.contact,
            bio: this.state.bio,
            skill: this.state.skill,
            education: this.state.education,
            password: this.state.password,
            email: this.state.email,
        }
        // console.log("newuser: "+newUser.skill);

        axios.post('http://localhost:4000/updateuser', newUser)
            .then(res => {
                alert("User Updated")
                
                // this.setState({
                //     name: this.state.name,
                //     password: this.state.password,
                //     contact: this.state.contact,
                //     bio: this.state.bio,
                //     skill: this.state.skill,
                // });
            })
            .catch(err => {
                alert("Invalid inputs");
            })
    }

    render() {
        // console.log("USER: " + this.state.name);
        if (this.state.usertype === "applicant") {
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/applicantdash">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>    
                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype: {this.state.usertype}</label>
                        </div>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={event => this.setState({name: event.target.value})}
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
                                <button onClick={this.deleteSkill(index)}>x</button>
                            </span>
                            ))}
                            <br/>
                            <button onClick={this.addSkill}>Add Skill</button>
                        </div>

                        <label>Education:</label>
                        <div>
                        {
                            this.state.education.map((education, index) => {
                                return (
                                    <div className="box" key={index}>
                                        <input name="institute" placeholder="institute" value={education.institute} onChange={this.saveEducation.bind(this, index)} />
                                        <input name="startyear" placeholder="startyear" value={education.startyear} onChange={this.saveEducation.bind(this, index)} />
                                        <input name="endyear" placeholder="endyear" value={education.endyear} onChange={this.saveEducation.bind(this, index)} />
                                        <div className="btn-box">
                                            {this.state.education.length !== 1 && <input type='button' value='x' onClick={this.deleteEducation.bind(this, index)} />}
                                            {this.state.education.length - 1 === index && <input type='button' value='add' onClick={this.addEducation.bind(this)}/>}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        </div>

                        <div className="form-group">
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )            
        }
        else if (this.state.usertype === "recruiter")
        {
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/applicantdash">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>    
                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype: {this.state.usertype}</label>
                        </div>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={event => this.setState({name: event.target.value})}
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
                            <label>Contact: </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.contact}
                                onChange={event => this.setState({contact: event.target.value})}
                                />
                        </div>
                        <div className="form-group">
                            <label>Bio: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.bio}
                                onChange={event => this.setState({bio: event.target.value})}
                                />
                        </div>
                        <div className="form-group">
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default Profile;