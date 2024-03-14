const express = require('express');
const { Applicationform, Exam } = require('../db/schema');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());

const gfs_t = Grid(mongoose.connection, mongoose.mongo);
gfs_t.collection('File');

const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection, {
	bucketname: 'examPapers',
});

const storage = new GridFsStorage({
	url: `${process.env.CONNECTIONSTRING}`,
});

const upload = multer({ storage });

// getting details regarding exam
router.route('/get-exam-details/:id').get(async (req, res) => {
	try {
		const exam = await Exam.findOne({ _id: req.params.id });
		// console.log(exams)
		// const participantsId = exam.participants.map(
		// 	(p) => new mongoose.Types.ObjectId(p)
		// );
		const participantsList = await Applicationform.find(
			{
				$and: [
					{ studentId: { $in: exam.participants } },
					{ examId: exam._id.toString() },
				],
			},
			{
				firstname: 1,
				lastname: 1,
				personalEmail: 1,
				examId: 1,
				studentId: 1,
			}
		);
		res.status(200).json({ exam, participantsList });
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router
	.route('/get-photo/:examId/:studentId/:filename')
	.get(async (req, res) => {
		const { examId, studentId, filename } = req.params;
		try {
			// const filename = await Applicationform.findOne(
			// 	{
			// 		examId,
			// 		studentId,
			// 	},
			// 	{ photo: 1, _id: 0 }
			// );
			// await gfs.find({filename})
			console.log(filename);
			return gfs
				.openDownloadStream(new mongoose.Types.ObjectId(filename))
				.pipe(res);
			// return res.status(200).json(filename);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	});
router
	.route('/get-idProof/:examId/:studentId/:filename')
	.get(async (req, res) => {
		const { examId, studentId, filename } = req.params;
		try {
			// const filename = await Applicationform.findOne(
			// 	{
			// 		examId,
			// 		studentId,
			// 	},
			// 	{ photo: 1, _id: 0 }
			// );
			// await gfs.find({filename})
			console.log(filename);
			return gfs
				.openDownloadStream(new mongoose.Types.ObjectId(filename))
				.pipe(res);
			// return res.status(200).json(filename);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	});
router.route('/:examId/:studentId').get(async (req, res) => {
	const { examId, studentId } = req.params;
	// console.log(examId, studentId);
	try {
		const appFormDetails = await Applicationform.findOne({
			examId,
			studentId,
		});
		console.log(appFormDetails);
		return res.status(200).json(appFormDetails);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
	// console.log(examId, studentId);
});
router.route('/').post(
	upload.fields([
		{ name: 'photo', maxCount: 1 },
		{ name: 'idProof', maxCount: 1 },
	]),
	async (req, res) => {
		try {
			console.log(req.body);
			console.log(req.files);
			console.log('hi');
			// console.log(req.files);
			// req.body.photo = req.files.photo[0].id.toString();
			// req.body.idProof = req.files.idProof[0].id.toString();
			console.log('hi');
			console.log({
				...req.body,
				photo: req.files.photo[0].id.toString(),
				idProof: req.files.idProof[0].id.toString(),
			});
			const newForm = new Applicationform({
				...req.body,
				photo: req.files.photo[0].id.toString(),
				idProof: req.files.idProof[0].id.toString(),
			});
			console.log('hi');

			await Exam.findOneAndUpdate(
				{ _id: req.body.examId },
				{
					'$push': {
						'participants': new mongoose.Types.ObjectId(req.body.studentId),
					},
				}
			);
			// exam;
			console.log('hi');

			await newForm.save();
			console.log('hi');

			console.log('exam');
			res.status(200).json({ success: true });
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
);

module.exports.router = router;
