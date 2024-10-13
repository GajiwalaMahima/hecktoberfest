const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/url');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/url-shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

app.use('/api/url', urlRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});