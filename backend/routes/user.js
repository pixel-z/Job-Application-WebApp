const express = require('express');
const router = express.Router();

// Loading user model
const user = require('../models/user');

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


const {body,validationResult} = require('express-validator'); // to validate if given email struct exists

// POST request
// Registration
router.post("/register", [
    body('email').isEmail()
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


// POST request
// Login
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email, password }).then(user => {
        // Checking if password and email combination is correct
        if(!user)
        {
            return res.status(404).json({
				error: "User not found",
			});
        }
        else{
            res.send("User found");
            return user;
        }
    });

})

module.exports = router;