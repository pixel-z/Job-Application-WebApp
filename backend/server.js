const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const DB_NAME = 'db'

// routes
var test = require('./routes/test');
var index = require('./routes/index');
var user = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() { 
    console.log("MongoDB database connection established successfully !");
})

// MongoDB Atlas (Online db)
// const uri = "mongodb+srv://newuser:newuser@cluster0.k0ziq.mongodb.net/db?retryWrites=true&w=majority"

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// });


// API endpoints
app.use("/test", test);
app.use("/", index);
app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

