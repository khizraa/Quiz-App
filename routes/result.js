var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo_url);

const resultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    quizTitle: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;