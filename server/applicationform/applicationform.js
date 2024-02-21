const express = require('express');
const { Applicationform, Exam } = require('../db/schema');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());

const gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('File');

const storage = new GridFsStorage({
	url: `${process.env.CONNECTIONSTRING}`,
});

const upload = multer({ storage });

router.route('/').post(
	upload.fields([
		{ name: 'photo', maxCount: 1 },
		{ name: 'idProof', maxCount: 1 },
	]),
	async (req, res) => {
		console.log(req.body);
		console.log(req.files);
		console.log('hi');

		// req.body.photo = req.files.photo[0].id.toString();
		// req.body.idProof = req.files.idProof[0].id.toString();
		const newForm = new Applicationform(req.body);
		await Exam.findOneAndUpdate(
			{ _id: req.body.examId },
			{
				'$push': {
					'participants': new mongoose.Types.ObjectId(
						req.body.studentId
					),
				},
			}
		);
		// console.log(exam);
		// exam;
		await newForm.save();
		res.json({ success: true });
	}
);

module.exports.router = router;
