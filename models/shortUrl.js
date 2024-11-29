const mongoose = require('mongoose')
const shortid = require ('shortid')
// shortid.generate() generates shortid
const shortUrlSchema = new mongoose.Schema({
    long:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
});
module.exports = mongoose.model('shortUrl',shortUrlSchema)