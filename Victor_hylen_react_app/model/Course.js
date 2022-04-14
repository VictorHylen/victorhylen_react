const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 200
    },
    code: {
        type: String,
        required: true,
        min: 2,
        max: 200
    }
});




module.exports = mongoose.model('Course', courseSchema);