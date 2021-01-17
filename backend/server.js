const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const DB = 'db'

// Loading user model
const User = require('./models/user');
const Profile = require('./models/profile');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB, { useNewUrlParser: true , useUnifiedTopology: true });
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
                usertype: req.body.usertype
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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

