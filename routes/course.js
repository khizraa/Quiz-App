var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo_url);

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
courseSchema.plugin(passportLocalMongoose);


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

