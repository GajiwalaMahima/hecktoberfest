const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;