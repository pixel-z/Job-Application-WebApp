const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const DB = 'db'

// Loading user model
const User = require('./models/user');
const Job = require('./models/jobs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', function() { 
    console.log("MongoDB database connection established successfully !");
})

// Getting all the users
app.get("/user", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


const {check,validationResult} = require('express-validator'); // to validate if given email struct exists

// Registration
app.post("/register", [
    check('email').isEmail()
], (req, res) => {

    // validate email structure 
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            errors: "Invalid email", 
        });
    }

    const email = req.body.email;
    
    // Check if email already exists
    User.findOne({ email }).then(user => {
        if(!user)
        {
            // email is not already used
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                usertype: req.body.usertype,
                rating: req.body.rating,
                skill: req.body.skill,
                education: req.body.education,
                contact: req.body.contact,
                bio: req.body.bio,
            });
        
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else
        {
            res.send("Email already exists");
            return user;
        }
    });

});

// Login
app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const usertype = req.body.usertype;

    User.findOne({ email, password, usertype }).then(user => {
        // Checking if password and email combination is correct
        if(!user)
        {
            return res.status(404).json({
				error: "User not found",
			});
        }
        else{
            res.send("User found");
        }
    });
})

// sending user information to frontend
app.post('/getuser', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if(!user)
        {
            return res.status(404).json({
				error: "User not found",
			});
        }
        else {
            // console.log(user);
            res.status(200).json({
                name: user.name,
                contact: user.contact,
                bio: user.bio,
                skill: user.skill,
                education: user.education,
                password: user.password,
            });
        }
    })
})

// updating user info
app.post('/updateuser', (req, res) => {
    
    // User.findOne({ email: req.body.email }).then(user => {
    //     if(!user)
    //     {
    //         return res.status(404).json({
	// 			error: "User not found",
	// 		});
    //     }
    //     else {
    //         user.updateOne(
    //             {name: req.body.name, contact: req.body.contact, bio: req.body.bio, password: req.body.password, skill: req.body.skill, education: req.body.education},
    //             {runValidators: true},
    //             function(err, user) {
    //                 if(err) return;
    //                 else {
    //                     console.log("user updated");
    //                 }
    //             }
    //         );
    //         res.status(200).json({
    //             name: user.name,
    //             contact: user.contact,
    //             bio: user.bio,
    //             skill: user.skill,
    //             education: user.education,
    //             password: user.password,
    //         });
    //     }
    // })

    var update = {   
        name: req.body.name,
        password: req.body.password,
        skill: req.body.skill,
        education: req.body.education,
        contact: req.body.contact,
        bio: req.body.bio
    }
    
    if(req.body.bio)
    update.bio = req.body.bio;
    else
        update.bio = '';

    User.findOneAndUpdate({email: req.body.email},update,{runValidators: true})
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
})

// creating job listing as a recruiter
app.post("/createjob", (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if(!user)
        {
            return res.status(404).json({
				error: "User not found",
			});
        }
        else {
            
            const newJob = new Job({
                title: req.body.title,
                name: user.name,
                email: req.body.email,
                dateofposting: req.body.dateofposting,
                deadline: req.body.deadline,
                skill: req.body.skill,
                jobtype: req.body.jobtype,
                duration: req.body.duration,
                salary: req.body.salary,
                no_applications: 0,
                no_positions: 0,
            });

            // console.log("deadline:: "+newJob)
        
            newJob.save()
                .then(job => {
                    res.status(200).json(job);
                })
                .catch(err => {
                    res.status(400).json(err);
                    console.log(err);
                });
        }
    })
    
});

// list all the jobs
app.get("/jobs", function(req, res) {
    Job.find(function(err, job) {
		if (err) {
			console.log(err);
		} else {
			res.json(job);
		}
	})
});

app.post('/updatejob',(req, res) => {
    const c = req.body.no_applications + 1;

    var update = {
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        dateofposting: req.body.dateofposting,
        deadline: req.body.deadline,
        skill: req.body.skill,
        jobtype: req.body.jobtype,
        duration: req.body.duration,
        salary: req.body.salary,
        no_applications: c,
        no_positions: req.body.no_positions,
        applicant: req.body.applicant,
    }
    Job.findOneAndUpdate({_id: req.body.id},update,{runValidators: true})
        .then(job => {
            // console.log(job)
            return res.status(200).json(job);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

