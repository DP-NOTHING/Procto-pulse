const express = require('express');
const router = express.Router();
const { Exam, User, Applicationform, Responses } = require('../db/schema');
const bcrypt = require('bcryptjs');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
// const { Exam, Responses, User } = require('../db/schema');
// const { default: mongoose } = require('mongoose');
router.use(express.json());
const storage = new GridFsStorage({
	url: `${process.env.CONNECTIONSTRING}`,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			// console.log(file);
			resolve({ bucketname: 'examPapers' });
		});
	},
});

const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection, {
	bucketname: 'examPapers',
});
// gfs.collection('File');

const upload = multer({ storage });

// getting all exams-list created by all teachers (for students)
router.route('/').get(async (req, res) => {
	try {
		const exams = await Exam.find({});
		// console.log(exams);
		res.status(200).json(exams);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
router.route('/').post(upload.single('file'), async (req, res) => {
	try {
		// const { noOfQuestions, testTime, testDateTime, examName } = req.body;
		req.body.file = req.file.filename;
		// console.log(req.body);
		// console.log('4444444');
		// console.log(req.file);
		const newExam = new Exam(req.body);

		console.log(newExam);
		await newExam.save();

		res.status(201).json({ message: 'Exam created successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
// getting all exams-list created by a teacher
router.route('/:email').get(async (req, res) => {
	try {
		const exams = await Exam.find({ teacherEmail: req.params.email });
		res.status(200).json(exams);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
router.route('/:examId').put(upload.single('file'), async (req, res) => {
	try {
		const exam = req.body;
		if (req.file) {
			exam.file = req.file.filename;
		}
		const oldExam = await Exam.findOneAndUpdate(
			{ _id: req.params.examId },
			exam,
			{
				returnOriginal: true,
			}
		);
		const file = (await gfs.find({ filename: oldExam.file }).toArray())[0];
		// console.log(file);
		if (file && req.file && oldExam.file)
			await gfs.delete(new mongoose.Types.ObjectId(file._id));
		res.status(201).json({ message: 'Exam updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.route('/:id').delete(async (req, res) => {
	try {
		// const exam = await Exam.findOne({ _id: req.params.id });
		const exam = await Exam.findOne({ _id: req.params.id });
		console.log(exam);
		const file = (await gfs.find({ filename: exam.file }).toArray())[0];
		console.log(file);
		await gfs.delete(new mongoose.Types.ObjectId(file._id));
		await Exam.deleteOne({ _id: exam._id });
		res.status(200).json([{ message: 'Success' }]);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
router.route('/download/:filename').get(async (req, res) => {
	// console.log(req.params.filename);
	try {
		// const file = await gfs.find({ filename: req.params.filename }).toArray()[0];
		// console.log(file);
		res.setHeader('Content-disposition', 'attachment; filename=test.pdf');
		res.set('Content-Type', 'application/pdf');
		return await gfs.openDownloadStreamByName(req.params.filename).pipe(res);
	} catch (error) {
		console.error(error);
		res.json({ message: 'Internal Server Error' });
	}
	// gfs.openDownloadStream(id)
	res.status(200).json({ message: 'success' });
});

router.route('/get-participated-exams/:studentEmail').get(async (req, res) => {
	try {
		const student = await User.findOne({
			email: req.params.studentEmail,
			role: 'student',
		});
		// console.log(student);
		const exams = await Exam.find({});
		// console.log(exams);
		const participatedExams = exams.filter((exam) =>
			exam.participants.includes(student._id)
		);
		// console.log(participatedExams);
		const resp = [];
		for (const e of participatedExams) {
			// console.log('eee', e);
			const exist = await Responses.exists({
				$and: [
					{
						examId: e._id.toString(),
					},
					{ studentId: student._id.toString() },
				],
			});
			if (!exist && new Date(e.testDateTime) > new Date()) resp.push(e);
		}
		// console.log(resp);
		res.status(200).json({ success: true, data: resp });
		// } else res.status(200).json({ success: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.route('/past-participated-exams/:studentEmail').get(async (req, res) => {
	try {
		const student = await User.findOne({
			email: req.params.studentEmail,
			role: 'student',
		});
		console.log(student);
		const exams = await Exam.find({});
		console.log(exams);
		const participatedExams = exams.filter((exam) =>
			exam.participants.includes(student._id)
		);
		console.log(participatedExams);
		const resp = [];
		for (const e of participatedExams) {
			// console.log('eee', e);
			const exist = await Responses.exists({
				$and: [
					{
						examId: e._id.toString(),
					},
					{ studentId: student._id.toString() },
				],
			});
			if (exist || new Date(e.testDateTime) < new Date()) resp.push(e);
		}
		// console.log(resp);
		res.status(200).json({ success: true, data: resp });
		// } else res.status(200).json({ success: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports.router = router;
