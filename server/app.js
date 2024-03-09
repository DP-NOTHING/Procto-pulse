const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('./db/connection');
const express = require('express');
const app = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
dotenv.config({ path: '../.env' });

app.use(cors());
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

app.use((req,res,next)=>{
	let token = req.headers['authorization']
	if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
	// console.log(token)
	// console.log("-0900------")
    if(!token) return res.status(401).json('Unauthorize user')
	try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
		// console.log(decoded)
        next()
   }catch(e){
		// console.log(e)
    	res.status(400).json('Token not valid')
   }
   return 
})

app.use('/applicationform', applicationformRouter);
app.use('/student', studentRouter);
app.use('/exam-response', responsesRouter);
// app.post('/applicationform/', async (req, res) => {
// 	res.json({ success: true });
// });

const { Test } = require('./db/schema');
const path = require('path');
const mongoose = require('mongoose');
const Exam = require('./db/schema');

app.use('/exam', exam);

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