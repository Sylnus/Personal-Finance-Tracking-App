const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userController = require('./controllers/userController');
const app = express();
app.use(express.json());

// mongodb connection
mongoose.connect('mongodb+srv://nshukla2:itis6112Project@userdata.htivr.mongodb.net/?retryWrites=true&w=majority&appName=userData')
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// routes
app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.use(express.static('public'));
app.use(express.static('views'));

//opens homepage when apps run for sign in and sign up
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});