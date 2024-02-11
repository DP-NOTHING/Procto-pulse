const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('./db/connection');
const express = require('express');
const app = express();
const fs = require('fs');

dotenv.config({ path: '../.env' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const loginRouter = require('./login/login').router;
const signupRouter = require('./login/signup').router;
const logoutRouter = require('./login/logout').router;
const teacherDashboard = require('./teacher/teacherDashboard').router;
const applicationformRouter = require('./applicationform/applicationform').router;

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/applicationform',applicationformRouter);

// app.post('/applicationform/', async (req, res) => {
// 	res.json({ success: true });
// });

const { Test } = require('./db/schema');
const path = require('path');
const mongoose = require('mongoose');
const Exam = require('./db/schema');


app.use('/teacherDashboard', teacherDashboard);

app.post('/api/exams', async (req, res) => {
	try {
		const { noOfQuestions, testTime, testDateTime, examName } = req.body;

		const newExam = new Exam({
			noOfQuestions,
			testTime,
			testDateTime,
			examName,
		});

		const savedExam = await newExam.save();

		res.json({ success: true, examId: savedExam._id });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

const test = require('./test').router;
app.use('/test', test);

app.listen(process.env.PORT, async () => {
	const connection = await connect();
	// const conn = await mongoose.connect(process.env.CONNECTIONSTRING);
	// const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
	// 	bucketName: 'media',
	// });
	console.log('connected');
	console.log(
		`server is up and running at http://127.0.0.1:${process.env.PORT}`
	);
});
