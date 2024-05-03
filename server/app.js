const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('./db/connection');
const express = require('express');
const app = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
dotenv.config({ path: '../.env' });

const corsOptions ={
	origin:[`http://127.0.0.1:3001`,`${process.env.CLIENT}`],
    credentials:true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

const loginRouter = require('./login/login').router;
const signupRouter = require('./login/signup').router;
const logoutRouter = require('./login/logout').router;
const exam = require('./teacher/exam').router;
const applicationformRouter =
	require('./applicationform/applicationform').router;
const studentRouter = require('./student/student').router;
const responsesRouter = require('./responses/responses').router;

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use((req, res, next) => {
	// console.log(req.url.includes('/exam/download'));

	const downloadingUrl =
		req.url.includes('/download') ||
		req.url.includes('/get-idProof') ||
		req.url.includes('/get-photo'); // @audit-ok needed to do this coz we just provide url directly where the stream will directly be provided. we are not requesting using axios so cant pass headers
	if (downloadingUrl) next();
	if (!downloadingUrl) {
		let token = req.headers['authorization'];
		if (token && token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}
		// console.log(token)
		// console.log("-0900------")
		if (!token) return res.status(401).json('Unauthorize user');
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decoded)
			next();
		} catch (e) {
			// console.log(e)
			res.status(400).json('Token not valid');
		}
	}
	return;
});
app.use('/applicationform', applicationformRouter);
app.use('/student', studentRouter);
app.use('/exam-response', responsesRouter);
app.use('/exam', exam);
// app.post('/applicationform/', async (req, res) => {
// 	res.json({ success: true });
// });

const { Test } = require('./db/schema');
const path = require('path');
const mongoose = require('mongoose');
const Exam = require('./db/schema');

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

app.use((err, req, res, next) => {
	// response to user with 403 error and details
});
