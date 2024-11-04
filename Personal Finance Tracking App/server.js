const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
//routes
app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

// mongodb connection
mongoose.connect('mongodb+srv://nshukla2:itis6112Project@userdata.htivr.mongodb.net/?retryWrites=true&w=majority&appName=userData')
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});