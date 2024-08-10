const express = require('express');
const router = express.Router();
const Course = require('./course');
const Quiz = require('./quiz');

const Result = require('./result');

// Dashboard
router.get('/dashboard', (req, res) => {
    res.render('teacher_dashboard');
});

// Add Course Page
router.get('/add-course', (req, res) => {
    res.render('add_course');
});

router.post('/add-course', (req, res) => {
    const { courseTitle, courseDescription } = req.body;
    // Handle file upload here if necessary
    const newCourse = new Course({
        title: courseTitle,
        description: courseDescription,
        createdBy: req.user._id // Assuming the teacher is logged in
    });

    newCourse.save()
        .then(() => res.redirect('/teacher_dashboard'))
        .catch(err => console.error(err));
});

// Add Quiz Page
router.get('/add-quiz', (req, res) => {
    res.render('add_quiz');
});


router.post('/add-quiz', (req, res) => {
    const { quizTitle, questions } = req.body;

    // Ensure questions is an array of objects
    let parsedQuestions;
    try {
        parsedQuestions = JSON.parse(questions);
    } catch (err) {
        console.error('Error parsing questions:', err);
        return res.status(400).send('Invalid questions format');
    }

    const newQuiz = new Quiz({
        title: quizTitle,
        questions: parsedQuestions,
        createdBy: req.user._id
    });

    newQuiz.save()
        .then(() => res.redirect('/teacher_dashboard'))
        .catch(err => {
            console.error('Error saving quiz:', err);
            res.status(500).send('Internal Server Error');
        });
});


// View Results Page
router.get('/view-results', (req, res) => {
    Result.find({})
        .then(results => {
            const totalScore = results.reduce((sum, result) => sum + result.score, 0);
            const averageResult = results.length ? (totalScore / results.length) : 0;

            res.render('view_results', { results, averageResult });
        })
        .catch(err => console.error(err));
});

module.exports = router;
