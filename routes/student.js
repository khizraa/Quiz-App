const express = require('express');
const router = express.Router();
const Quiz = require('./quiz');

// Student Dashboard
router.get('/dashboard', (req, res) => {
    res.render('student_dashboard');
});

// MERN Developer Quiz Options
router.get('/quiz/mern', (req, res) => {
    res.render('quiz_options', { title: 'MERN Developer Quiz', options: ['HTML', 'CSS', 'JavaScript', 'Mongoose', 'Express'] });
});

// App Developer Quiz Options
router.get('/quiz/app', (req, res) => {
    res.render('quiz_options', { title: 'App Developer Quiz', options: ['Android', 'iOS', 'Flutter', 'React Native'] });
});

// Graphics Quiz Options
router.get('/quiz/graphics', (req, res) => {
    res.render('quiz_options', { title: 'Graphics Quiz', options: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'] });
});

// Load Quiz based on selection
router.get('/quiz/:category/:type', async (req, res) => {
    const { type } = req.params;
    const quizTitle = `${type} `;  // Constructs the quiz title

    try {
        console.log('Searching for quiz with title:', quizTitle);  // Debugging line

        // Find quiz using case-insensitive regex
        const quiz = await Quiz.findOne({ title: new RegExp(`^${quizTitle}$`, 'i') }).exec();

        if (quiz) {
            console.log('Quiz found:', quiz);  // Debugging line
            res.render('quiz_page', { quiz });
        } else {
            console.log('No quiz found for title:', quizTitle);  // Debugging line
            res.render('no_quiz', { message: `No quiz uploaded by any teacher for ${quizTitle}` });
        }
    } catch (err) {
        console.error('Error finding quiz:', err);  // Detailed error logging
        res.status(500).send('Server Error: ' + err.message);  // Return error message to the client
    }
});

module.exports = router;
