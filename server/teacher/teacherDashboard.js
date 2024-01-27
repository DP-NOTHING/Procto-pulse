const express = require('express');
const router = express.Router();
const { Exam } = require('../db/schema');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
router.use(express.json());

router.route('/').post(async (req, res) => {
	try {
		const { noOfQuestions, testTime, testDateTime, examName } = req.body;

		const newExam = new Exam({
			noOfQuestions,
			testTime,
			testDateTime,
			examName,
		});

		console.log(newExam);
		await newExam.save();

		res.status(201).json({ message: 'Exam created successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
// getting all exams-list
router.route('/').get(async (req, res) => {
	try {
		const exams = await Exam.find({});
		res.status(200).json(exams);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
// getting details regarding exam
router.route('/:id').get(async (req, res) => {
	try {
		const exam = await Exam.findOne({ _id: req.params.id });
		res.status(200).json(exam);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
module.exports.router = router;
